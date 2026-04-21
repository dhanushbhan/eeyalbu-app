import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/useStore";

const PARAMETERS = [
  { key: "elevation", label: "Elevation", color: "#f5d76e", fill: true },
  { key: "temp", label: "Temperature", color: "#73d2de" },
  { key: "prec", label: "Precipitation", color: "#4fa3ff" },
  { key: "slope", label: "Slope", color: "#f08a5d" },
  { key: "snow", label: "Snow Days", color: "#d9f2ff" },
  { key: "soc", label: "SOC", color: "#9ee493" },
  { key: "nitrogen", label: "Soil Nitrogen", color: "#d6a2e8" },
  { key: "bulk_density", label: "Bulk Density", color: "#f78fb3" },
];

function getSampleValue(sample, key) {
  if (sample[key] !== undefined) {
    return sample[key];
  }

  if (key === "bulk_density" && sample.bulkDensity !== undefined) {
    return sample.bulkDensity;
  }

  return null;
}

function formatRange(value) {
  return Number.isFinite(value) ? value.toFixed(1) : "n/a";
}

const TransectGraph = observer(function TransectGraph() {
  const { transectStore } = useStore();
  const samples = transectStore.transectSamples;
  const hasSamples = samples.length > 1;

  const chartWidth = 100;
  const chartHeight = 100;
  const margin = { top: 4, right: 10, bottom: 10, left: 18 };
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const bandHeight = innerHeight / PARAMETERS.length;
  const maxDistance = samples.length > 0 ? samples[samples.length - 1].distance_m ?? 0 : 0;

  return (
    <div className="transect-graph">
      <div className="transect-graph__header">
        <div className="data-title">Transect Profile</div>
        <div className="transect-graph__actions">
          <button
            className="ui-button"
            onClick={transectStore.startDrawing}
            disabled={transectStore.isLoading}
          >
            Start drawing
          </button>
          <button
            className="ui-button"
            onClick={transectStore.finishDrawing}
            disabled={!transectStore.canFinish || transectStore.isLoading}
          >
            Done
          </button>
        </div>
      </div>

      <div className={`transect-graph__status${transectStore.error ? " transect-graph__status--error" : ""}`}>
        {transectStore.error ?? transectStore.statusMessage}
      </div>

      <div className="transect-graph__surface">
        {!hasSamples ? (
          <div className="empty-state">
            Draw a transect on the map and press Done.
            <br />
            Once your backend is ready, the environmental profiles will appear here.
          </div>
        ) : (
          <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            {PARAMETERS.map((parameter, index) => {
              const bandTop = margin.top + index * bandHeight;
              const bandBottom = bandTop + bandHeight;
              const bandMid = bandTop + bandHeight / 2;
              const values = samples
                .map((sample) => getSampleValue(sample, parameter.key))
                .filter((value) => Number.isFinite(value));

              const minValue = values.length > 0 ? Math.min(...values) : 0;
              const maxValue = values.length > 0 ? Math.max(...values) : 1;
              const valueRange = maxValue - minValue || 1;

              const polylinePoints = samples.map((sample) => {
                const distance = sample.distance_m ?? 0;
                const value = getSampleValue(sample, parameter.key);
                const normalizedValue = value === null ? 0 : (value - minValue) / valueRange;
                const x = margin.left + ((maxDistance === 0 ? 0 : distance / maxDistance) * innerWidth);
                const y = bandBottom - normalizedValue * (bandHeight * 0.72) - bandHeight * 0.14;
                return `${x},${y}`;
              });

              return (
                <g key={parameter.key}>
                  <line
                    x1={margin.left} y1={bandBottom}
                    x2={chartWidth - margin.right} y2={bandBottom}
                    stroke="rgba(255,255,255,0.12)" strokeWidth="0.4"
                  />
                  <text x="1.5" y={bandMid} fill="white" fontSize="2.8" dominantBaseline="middle">
                    {parameter.label}
                  </text>
                  <text x={chartWidth - margin.right + 1} y={bandTop + 3} fill="rgba(255,255,255,0.7)" fontSize="2.1">
                    {formatRange(maxValue)}
                  </text>
                  <text x={chartWidth - margin.right + 1} y={bandBottom - 1} fill="rgba(255,255,255,0.7)" fontSize="2.1">
                    {formatRange(minValue)}
                  </text>
                  {parameter.fill && (
                    <polygon
                      points={[
                        `${margin.left},${bandBottom}`,
                        ...polylinePoints,
                        `${chartWidth - margin.right},${bandBottom}`,
                      ].join(" ")}
                      fill="rgba(245,215,110,0.2)"
                    />
                  )}
                  <polyline
                    points={polylinePoints.join(" ")}
                    fill="none"
                    stroke={parameter.color}
                    strokeWidth={parameter.fill ? "0.8" : "0.6"}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            <line
              x1={margin.left} y1={chartHeight - margin.bottom}
              x2={chartWidth - margin.right} y2={chartHeight - margin.bottom}
              stroke="white" strokeWidth="0.5"
            />
            <line
              x1={margin.left} y1={chartHeight - margin.bottom}
              x2={margin.left} y2={margin.top}
              stroke="white" strokeWidth="0.5"
            />
            <text x={margin.left} y={chartHeight - 2} fill="white" fontSize="2.4">0 km</text>
            <text x={chartWidth - margin.right - 10} y={chartHeight - 2} fill="white" fontSize="2.4">
              {(maxDistance / 1000).toFixed(2)} km
            </text>
          </svg>
        )}
      </div>
    </div>
  );
});

export default TransectGraph;
