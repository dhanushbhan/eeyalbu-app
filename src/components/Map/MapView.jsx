import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/useStore";
import { createEmptyFeatureCollection } from "../../utils/transect";

const EMPTY_FEATURE_COLLECTION = createEmptyFeatureCollection();
const TRANSECT_LINE_SOURCE_ID = "transect-line-source";
const TRANSECT_POINT_SOURCE_ID = "transect-point-source";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = observer(function MapView() {
  const { appStore, transectStore } = useStore();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapReady = useRef(false);
  const lastCallTime = useRef(0);
  const activeRequest = useRef(null);
  const hoverLng = transectStore.hoverCoordinate?.[0];
  const hoverLat = transectStore.hoverCoordinate?.[1];

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#080b0c" },
          },
        ],
      },
      center: [78.5, 31.5],
      zoom: 8,
      pitch: 60,
      maxBounds: [[68, 22], [90, 41]],
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {
      mapReady.current = true;

      mapInstance.resize();

      // DEM
      mapInstance.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14
      });

      mapInstance.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5
      });

      mapInstance.addLayer({
        id: "terrain-hillshade",
        type: "hillshade",
        source: "mapbox-dem",
        paint: {
          "hillshade-shadow-color": "#000000",
          "hillshade-highlight-color": "#1c2828",
          "hillshade-accent-color": "#000000",
          "hillshade-intensity": 0.55,
          "hillshade-illumination-anchor": "map",
        },
      });

      // LULC
      mapInstance.addSource("lulc", {
        type: "raster",
        url: "mapbox://delta-d04.791mhg8b"
      });

      mapInstance.addLayer({
        id: "lulc-layer",
        type: "raster",
        source: "lulc",
        paint: {
          "raster-opacity": 0.88
        }
      });

      mapInstance.addSource(TRANSECT_LINE_SOURCE_ID, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });

      mapInstance.addLayer({
        id: "transect-line-layer",
        type: "line",
        source: TRANSECT_LINE_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#ffef8a",
          "line-width": 4,
          "line-opacity": 0.95,
        },
      });

      mapInstance.addSource(TRANSECT_POINT_SOURCE_ID, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });

      mapInstance.addLayer({
        id: "transect-point-layer",
        type: "circle",
        source: TRANSECT_POINT_SOURCE_ID,
        paint: {
          "circle-radius": 5,
          "circle-color": "#111111",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffef8a",
        },
      });

    });

    // Controls (OUTSIDE load)
    mapInstance.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "metric"
      }),
      "bottom-left"
    );

    mapInstance.addControl(
      new mapboxgl.NavigationControl({
        showZoom: false,
        showCompass: true
      }),
      "top-left"
    );

    mapInstance.on("mousemove", (e) => {
      if (transectStore.isDrawing) {
        transectStore.updateHoverCoordinate([e.lngLat.lng, e.lngLat.lat]);
        return;
      }

      const now = Date.now();

      // limit to ~20 requests per second
      if (now - lastCallTime.current < 100) return;

      lastCallTime.current = now;
      const { lng, lat } = e.lngLat;

      if (activeRequest.current) {
        activeRequest.current.abort();
      }

      activeRequest.current = new AbortController();

      fetch(`http://127.0.0.1:8000/sample?lat=${lat}&lng=${lng}`, {
        signal: activeRequest.current.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.cca1 !== null) {
            appStore.setMouseCoords(data);
          }
        })
        .catch(() => {});
    });

    mapInstance.on("click", (event) => {
      if (!transectStore.isDrawing) {
        return;
      }

      transectStore.addCoordinate([event.lngLat.lng, event.lngLat.lat]);
    });

    return () => {
      if (activeRequest.current) {
        activeRequest.current.abort();
      }

      mapReady.current = false;
      mapInstance.remove();
      map.current = null;
    };
  }, [appStore, transectStore]);

  useEffect(() => {
    if (!map.current || !mapReady.current) {
      return;
    }

    const canvas = map.current.getCanvas();
    canvas.style.cursor = transectStore.isDrawing ? "crosshair" : "";

    if (transectStore.isDrawing) {
      map.current.doubleClickZoom.disable();
    } else {
      map.current.doubleClickZoom.enable();
    }
  }, [transectStore.isDrawing]);

  useEffect(() => {
    if (!map.current || !mapReady.current) {
      return;
    }

    const lineSource = map.current.getSource(TRANSECT_LINE_SOURCE_ID);
    const pointSource = map.current.getSource(TRANSECT_POINT_SOURCE_ID);

    if (lineSource) {
      lineSource.setData(transectStore.lineFeatureCollection);
    }

    if (pointSource) {
      pointSource.setData(transectStore.pointFeatureCollection);
    }
  }, [
    transectStore,
    transectStore.draftCoordinates.length,
    hoverLng,
    hoverLat,
    transectStore.isDrawing,
  ]);

  return (
    <div className="map-root">
      <div ref={mapContainer} className="map-container" />
      <div className="map-legend">
        <img src="/legend.png" alt="Map Legend" className="legend-image" />
      </div>
    </div>
  );
});

export default MapView;
