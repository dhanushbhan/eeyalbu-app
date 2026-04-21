import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/useStore";

const OptionsMenu = observer(function OptionsMenu() {
  const { appStore } = useStore();
  const menuClassName = appStore.isOptionsMenuOpen
    ? "options-menu__items options-menu__items--open"
    : "options-menu__items";

  const getButtonClassName = (mode) =>
    appStore.mode === mode ? "ui-button ui-button--active" : "ui-button";

  return (
    <div className="options-menu">
      <div className={menuClassName}>
        <button className={getButtonClassName("home")} onClick={() => appStore.setMode("home")}>
          Home
        </button>
        <button className={getButtonClassName("explorer")} onClick={() => appStore.setMode("explorer")}>
          Explorer
        </button>
        <button className={getButtonClassName("transect")} onClick={() => appStore.setMode("transect")}>
          Transect
        </button>
      </div>

      <button
        aria-label="Toggle navigation"
        className="icon-button"
        onClick={() => appStore.toggleOptionsMenu()}
      >
        <span className="icon-button__mark" aria-hidden="true">
          <span />
        </span>
      </button>
    </div>
  );
});

export default OptionsMenu;