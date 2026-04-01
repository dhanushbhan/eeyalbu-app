import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({ onMouseMove }) {
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

    mapInstance.on("mousemove", (e) => {
      const { lng, lat } = e.lngLat;

      if (onMouseMove) {
        onMouseMove({ lng, lat });
      }
    });

  }, []);

  return (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    
    {/* Map */}
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%" }}
    />

    {/* Legend */}
    <div
      style={{
        position: "absolute",
        bottom: "80px",   // 👈 sits above scale bar
        left: "10px",
        background: "rgba(0,0,0,0.6)",
        padding: "8px",
        borderRadius: "8px",
        fontSize: "10px",
        pointerEvents: "none", // 👈 non-clickable
        maxHeight: "600px",
        overflow: "hidden"
      }}
    >
      <img 
          src= "/legend.png"
          alt="Map Legend" 
          className="legend-image"
          style={{ width: "150px", height: "auto", marginTop: "0px", marginLeft: "0px" }}
        />
    </div>

  </div>
);
}