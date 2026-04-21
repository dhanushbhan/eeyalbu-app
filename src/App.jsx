import MapView from "./components/Map/MapView";
import OptionsMenu from "./components/UI/OptionsMenu";
import PanelContainer from "./components/Panels/PanelContainer";

import HomePanel from "./components/Panels/HomePanel";
import ExplorerPanel from "./components/Panels/ExplorerPanel";
import TransectPanel from "./components/Panels/TransectPanel";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/useStore";

const App = observer(function App() {
  const { appStore } = useStore();

  const renderPanel = () => {
    switch (appStore.mode) {
      case "explorer":
        return <ExplorerPanel />;
      case "transect":
        return <TransectPanel />;
      case "home":
      default:
        return <HomePanel />;
    }
  };

  return (
    <div className="app-shell">
      <MapView />

      <OptionsMenu />

      <PanelContainer>
        {renderPanel()}
      </PanelContainer>
    </div>
  );
});

export default App;
