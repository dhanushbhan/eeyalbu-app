import MapView from "./components/Map/MapView";
import OptionsMenu from "./components/UI/OptionsMenu";
import PanelContainer from "./components/Panels/PanelContainer";

import HomePanel from "./components/Panels/HomePanel";
import ExplorerPanel from "./components/Panels/ExplorerPanel";
import TransectPanel from "./components/Panels/TransectPanel";

import { useState } from "react";

function App() {
  const [mode, setMode] = useState("home");
  const [mouseCoords, setMouseCoords] = useState(null);

  const renderPanel = () => {
    switch (mode) {
      case "explorer":
        return <ExplorerPanel />;
      case "transect":
        return <TransectPanel mouseCoords={mouseCoords} />;
      case "home":
      default:
        return <HomePanel />;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      
      <MapView onMouseMove={setMouseCoords} />

      <OptionsMenu onSelect={setMode} />

      <PanelContainer>
        {renderPanel()}
      </PanelContainer>

    </div>
  );
}

export default App;