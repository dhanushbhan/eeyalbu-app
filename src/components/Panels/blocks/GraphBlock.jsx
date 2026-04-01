export default function GraphBlock({ title, data, selected }) {
  if (!data || selected.length === 0) {
    return (
      <div style={{ padding: "6px" }}>
        <div style={{ fontSize: "12px" }}>{title}</div>
      </div>
    );
  }

  const CLASS_COLORS = {
    0: "#58a8a8", 1: "#62c400", 2: "#e08421", 3: "#389540",
    4: "#c5ea4c", 5: "#28cea4", 6: "#faff5d", 7: "#ead03f",
    8: "#b2b950", 9: "#efae4d", 10: "#e26147", 11: "#569875",
    12: "#59b450", 13: "#50e4da", 14: "#b3ff7d", 15: "#eea323",
    16: "#d95980", 17: "#0e70f0", 18: "#dcdbe1", 19: "#c4ff01"
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        padding: "6px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden"
      }}
    >
      {/* Title */}
      <div style={{ fontSize: "12px", marginBottom: "4px" }}>
        {title}
      </div>

      {/* Vertical Distribution */}
      <div style={{ flex: 1, position: "relative", paddingLeft: "30px",   // 👈 space for Y label
           paddingBottom: "20%"  // 👈 space for X label 

      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {selected.map((cls) => {
            const classData = data[cls.id];
            if (!classData) return null;

            const counts = classData.counts;
            const total = counts.reduce((a, b) => a + b, 0);
            

            const binCount = counts.length;

            // Convert to points
           // Normalize densities
            const densities = counts.map(c => c / total);
            const maxDensity = Math.max(...densities);

            const points = densities.map((d, i) => {
                const x = (d / maxDensity) * 85; // 👈 FULL WIDTH USAGE

                const y = 100 - (i / (binCount - 1)) * 70;

                return `${x},${y}`;
            });

            return (
                <polyline
                key={cls.id}
                points={points.join(" ")}
                fill="none"
                stroke={CLASS_COLORS[cls.id]}
                strokeWidth="3"
                strokeOpacity="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            );
            })}
        </svg>
            {/* Axis Labels */}
            {/* Y max (top) */}
            <div
                style={{
                position: "absolute",
                top: "15px",
                left: "2px",
                fontSize: "10px",
                opacity: 0.7
                }}
            >
                max
            </div>

            {/* Origin (bottom-left) */}
            <div
                style={{
                position: "absolute",
                bottom: "18px",
                left: "2px",
                fontSize: "10px",
                opacity: 0.7
                }}
            >
                min
            </div>

            {/* X max (bottom-right) */}
            <div
                style={{
                position: "absolute",
                bottom: "18px",
                right: "2px",
                fontSize: "10px",
                opacity: 0.7
                }}
            >
                max
            </div>
            <div
                style={{
                position: "absolute",
                top: "50%",
                left: "-10px",
                transform: "translateY(-50%) rotate(-90deg)",
                transformOrigin: "center",
                fontSize: "10px",
                opacity: 0.7,
                whiteSpace: "nowrap"
            }}
            >
            {title}
            </div>
            <div
            style={{
                position: "absolute",
                bottom: "18px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "10px",
                opacity: 0.7
            }}
            >
            Density
            </div>
            </div>
            


       </div>
  );
}