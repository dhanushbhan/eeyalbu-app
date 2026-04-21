import { makeAutoObservable, runInAction } from "mobx";

export const CLASS_OPTIONS = [
  { id: 0, label: "West Himalayan Fir" },
  { id: 1, label: "East Himalayan Fir" },
  { id: 2, label: "Barren Land" },
  { id: 3, label: "Broadleaf Deciduous" },
  { id: 4, label: "Himalayan Birch" },
  { id: 5, label: "Deodar" },
  { id: 6, label: "Ladakh Peashrub" },
  { id: 7, label: "Dry Alpine Meadows" },
  { id: 8, label: "Oatgrass" },
  { id: 9, label: "Black Juniper" },
  { id: 10, label: "Alpine sedges" },
  { id: 11, label: "Moist Alpine Meadows" },
  { id: 12, label: "Marsh Meadows" },
  { id: 13, label: "Blue Pine" },
  { id: 14, label: "Oaks" },
  { id: 15, label: "Dwarf Rhododendron" },
  { id: 16, label: "Bell Rhododendron" },
  { id: 17, label: "Water/Cloud" },
  { id: 18, label: "Snow Cover" },
  { id: 19, label: "Temperate Grassy Slopes" },
];

export class ExplorerStore {
  selectedClasses = [];
  histData = null;
  isDropdownOpen = false;
  isLoading = false;
  hasLoaded = false;
  loadError = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get selectedText() {
    if (this.selectedClasses.length === 0) {
      return "Select classes";
    }

    return this.selectedClasses.map((selectedClass) => selectedClass.label).join(", ");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleClass(option) {
    const isSelected = this.selectedClasses.some((item) => item.id === option.id);

    if (isSelected) {
      this.selectedClasses = this.selectedClasses.filter((item) => item.id !== option.id);
      return;
    }

    if (this.selectedClasses.length >= 5) {
      return;
    }

    this.selectedClasses = [...this.selectedClasses, option];
  }

  async loadHistData() {
    if (this.isLoading || this.hasLoaded) {
      return;
    }

    this.isLoading = true;
    this.loadError = null;

    try {
      const response = await fetch("/histograms.json");

      if (!response.ok) {
        throw new Error(`Failed to load histograms: ${response.status}`);
      }

      const data = await response.json();

      runInAction(() => {
        this.histData = data;
        this.hasLoaded = true;
      });
    } catch (error) {
      runInAction(() => {
        this.loadError = error instanceof Error ? error.message : "Failed to load histograms.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
