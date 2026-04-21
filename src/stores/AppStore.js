import { makeAutoObservable } from "mobx";

export class AppStore {
  mode = "home";
  mouseCoords = null;
  isOptionsMenuOpen = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setMode(mode) {
    this.mode = mode;
    this.isOptionsMenuOpen = false;
  }

  setMouseCoords(coords) {
    this.mouseCoords = coords;
  }

  toggleOptionsMenu() {
    this.isOptionsMenuOpen = !this.isOptionsMenuOpen;
  }
}
