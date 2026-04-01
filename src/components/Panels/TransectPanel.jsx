import CCAPlot from "./blocks/CCAPlot";
import TransectGraph from "./blocks/TransectGraph";

export default function TransectPanel({mouseCoords}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* TOP: CCA Plot (1/3) */}
      <div 
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          marginBottom: "6px",
          padding: "6px"
        }}
      >
        <CCAPlot mouseCoords={mouseCoords}/>
      </div>

      {/* BOTTOM: Transect Graph (2/3) */}
      <div
        style={{
          flex: 2,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "6px"
        }}
      >
        <TransectGraph />
      </div>

    </div>
  );
}