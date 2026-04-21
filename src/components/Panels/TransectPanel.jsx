import CCAPlot from "./blocks/CCAPlot";
import TransectGraph from "./blocks/TransectGraph";

export default function TransectPanel() {
  return (
    <div className="transect-stack">
      <div className="transect-card transect-card--plot">
        <CCAPlot />
      </div>
      <div className="transect-card transect-card--graph">
        <TransectGraph />
      </div>
    </div>
  );
}
