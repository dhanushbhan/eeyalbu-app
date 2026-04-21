import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/useStore";
import { CLASS_OPTIONS } from "../../../stores/ExplorerStore";

const Dropdown = observer(function Dropdown() {
  const { explorerStore } = useStore();

  return (
    <div className="dropdown">
      <button
        className="dropdown-trigger"
        onClick={() => explorerStore.toggleDropdown()}
      >
        <span className="dropdown-trigger__text">{explorerStore.selectedText}</span>
        <span className="dropdown-trigger__chevron" />
      </button>

      {explorerStore.isDropdownOpen && (
        <div className="dropdown-menu">
          {CLASS_OPTIONS.map((option) => {
            const isSelected = explorerStore.selectedClasses.some(
              (selectedClass) => selectedClass.id === option.id
            );

            return (
              <button
                key={option.id}
                className={`dropdown-option${isSelected ? " dropdown-option--selected" : ""}`}
                onClick={() => explorerStore.toggleClass(option)}
              >
                <span className="dropdown-option__check">{isSelected ? "✓" : ""}</span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default Dropdown;
