import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Dropdown from "./blocks/Dropdown";
import GraphBlock from "./blocks/GraphBlock";
import { useStore } from "../../stores/useStore";

const ExplorerPanel = observer(function ExplorerPanel() {
  const { explorerStore } = useStore();

  useEffect(() => {
    explorerStore.loadHistData();
  }, [explorerStore]);

  return (
    <div className="panel-content">
      <Dropdown />

      <div className="explorer-grid">
        <GraphBlock title="Elevation" data={explorerStore.histData?.elev} />
        <GraphBlock title="Temperature" data={explorerStore.histData?.MATemp} />
        <GraphBlock title="Precipitation" data={explorerStore.histData?.MAPrec} />
        <GraphBlock title="Slope" data={explorerStore.histData?.slope} />
        <GraphBlock title="Snow Days" data={explorerStore.histData?.snow} />
        <GraphBlock title="SOC" data={explorerStore.histData?.soc} />
        <GraphBlock title="Soil Nitrogen" data={explorerStore.histData?.nitrogen} />
        <GraphBlock title="Bulk Density" data={explorerStore.histData?.bulk} />
      </div>
    </div>
  );
});

export default ExplorerPanel;