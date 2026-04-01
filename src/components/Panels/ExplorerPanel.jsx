import { useEffect, useState } from "react";
import Dropdown from "./blocks/Dropdown";
import GraphBlock from "./blocks/GraphBlock";

export default function ExplorerPanel() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [histData, setHistData] = useState(null);

  // Load JSON once
  useEffect(() => {
    fetch("/histograms.json")
      .then((res) => res.json())
      .then((data) => setHistData(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* Dropdown */}
      <Dropdown onChange={setSelectedClasses} />

      {/* Graph Grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "repeat(4, minmax(0, 1fr))",
          overflow: "hidden",
          gap: "6px",
          marginTop: "6px"
        }}
      >
        <GraphBlock title="Elevation" data={histData?.elev} selected={selectedClasses} />
        <GraphBlock title="Temperature" data={histData?.MATemp} selected={selectedClasses} />
        <GraphBlock title="Precipitation" data={histData?.MAPrec} selected={selectedClasses} />
        <GraphBlock title="Slope" data={histData?.slope} selected={selectedClasses} />
        <GraphBlock title="Snow Days" data={histData?.snow} selected={selectedClasses} />
        <GraphBlock title="SOC" data={histData?.soc} selected={selectedClasses} />
        <GraphBlock title="Soil Nitrogen" data={histData?.nitrogen} selected={selectedClasses} />
        <GraphBlock title="Bulk Density" data={histData?.bulk} selected={selectedClasses} />
      </div>

    </div>
  );
}