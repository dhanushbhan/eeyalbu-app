export default function CCAPlot({ mouseCoords }) {

    if (mouseCoords) {
        console.log("Mouse in CCAPlot:", mouseCoords);
    };
    
  const CLASS_COLORS = {
    0: "#58a8a8", 1: "#62c400", 2: "#e08421", 3: "#389540",
    4: "#c5ea4c", 5: "#28cea4", 6: "#faff5d", 7: "#ead03f",
    8: "#b2b950", 9: "#efae4d", 10: "#e26147", 11: "#569875",
    12: "#59b450", 13: "#50e4da", 14: "#b3ff7d", 15: "#eea323",
    16: "#d95980", 17: "#0e70f0", 18: "#dcdbe1", 19: "#c4ff01"
  };

  // 📍 Class centroids
  const classPoints = [
    { id: 0, x: -1.26, y: -0.50 },
    { id: 1, x: -1.04, y: -0.05 },
    { id: 2, x: 0.87, y: -0.46 },
    { id: 3, x: -1.06, y: -0.51 },
    { id: 4, x: -0.23, y: -0.05 },
    { id: 5, x: -0.20, y: -0.37 },
    { id: 6, x: 0.57, y: -0.26 },
    { id: 7, x: 0.25, y: 0.14 },
    { id: 8, x: -0.51, y: 0.71 },
    { id: 9, x: -0.33, y: 0.68 },
    { id: 10, x: -0.16, y: 0.88 },
    { id: 11, x: -0.40, y: 0.49 },
    { id: 12, x: -0.49, y: 0.61 },
    { id: 13, x: -0.60, y: -0.11 },
    { id: 14, x: -0.55, y: 0.24 },
    { id: 15, x: -0.66, y: 0.49 },
    { id: 16, x: -0.85, y: 0.41 },
    { id: 17, x: -0.27, y: -0.41 },
    { id: 18, x: 0.87, y: 0.55 },
    { id: 19, x: -1.90, y: -0.74 }
  ];

  // 🌿 Env vectors
  const vectors = [
    { name: "elev", x: 0.98, y: 0.13 },
    { name: "slope", x: -0.10, y: 0.22 },
    { name: "temp", x: -0.98, y: -0.12 },
    { name: "precip", x: -0.90, y: 0.07 },
    { name: "snow", x: -0.16, y: 0.45 },
    { name: "soc", x: -0.12, y: 0.62 },
    { name: "nitrogen", x: 0.22, y: 0.27 },
    { name: "bulk", x: 0.47, y: -0.18 }
  ];

  // 📏 bounds
    const allX = classPoints.map(p => p.x);
    const allY = classPoints.map(p => p.y);

    const maxAbsX = Math.max(...allX.map(v => Math.abs(v)));
    const maxAbsY = Math.max(...allY.map(v => Math.abs(v)));

    const margin = 5; // percent padding

    const scaleX = x =>
    margin + ((x + maxAbsX) / (2 * maxAbsX)) * (100 - 2 * margin);

    const scaleY = y =>
        100 - (
            margin + ((y + maxAbsY) / (2 * maxAbsY)) * (100 - 2 * margin)
        );

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>

      <div style={{ fontSize: "12px", marginBottom: "4px" }}>
        CCA Space
      </div>

      <svg
        width="100%"
        height="90%"
        viewBox="0 0 100 100"
        style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", overflow: "hidden"  }}
      >

        {/* Origin */}
        <circle cx={scaleX(0)} cy={scaleY(0)} r="1.5" fill="white" />

        {/* VECTORS */}
        {vectors.map((v, i) => (
          <g key={i}>
            <line
              x1={scaleX(0)}
              y1={scaleY(0)}
              x2={scaleX(v.x)}
              y2={scaleY(v.y)}
              stroke="white"
              strokeWidth="0.6"
            />
            <text
              x={scaleX(v.x)}
              y={scaleY(v.y)}
              fontSize="3"
              fill="white"
            >
              {v.name}
            </text>
          </g>
        ))}

        {/* CLASS POINTS */}
        {classPoints.map((p) => (
          <circle
            key={p.id}
            cx={scaleX(p.x)}
            cy={scaleY(p.y)}
            r="1.5"
            fill={CLASS_COLORS[p.id]}
          />
        ))}

      </svg>

    </div>
  );
}