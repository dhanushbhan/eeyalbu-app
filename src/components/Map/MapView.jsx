import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // prevent double initialization
    if (map.current ) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [78.5, 31.5], // Roi centre
      zoom: 8,
      pitch: 60,
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {

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
          "raster-opacity": 0.7
        }
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

  

  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}