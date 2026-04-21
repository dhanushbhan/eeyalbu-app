import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/useStore";

const GraphBlock = observer(function GraphBlock({ title, data }) {
  const { explorerStore } = useStore();
  const selected = explorerStore.selectedClasses;

  if (!data || selected.length === 0) {
    return (
      <div className="data-card data-card--empty">
        <div className="data-title data-muted">{title}</div>
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
    <div className="data-card">
      <div className="data-title">{title}</div>

      <div className="graph-area">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {selected.map((cls) => {
            const classData = data[cls.id];
            if (!classData) return null;

            const counts = classData.counts;
            const total = counts.reduce((a, b) => a + b, 0);
            const binCount = counts.length;
            const densities = counts.map(c => c / total);
            const maxDensity = Math.max(...densities);

            const points = densities.map((d, i) => {
              const x = (d / maxDensity) * 85;
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

        <div className="axis-label axis-label--top">max</div>
        <div className="axis-label axis-label--bottom-left">min</div>
        <div className="axis-label axis-label--bottom-right">max</div>
        <div className="axis-label axis-label--vertical">{title}</div>
        <div className="axis-label axis-label--horizontal">Density</div>
      </div>
    </div>
  );
});

export default GraphBlock;
