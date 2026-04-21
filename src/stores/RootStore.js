import { AppStore } from "./AppStore";
import { ExplorerStore } from "./ExplorerStore";
import { TransectStore } from "./TransectStore";

export class RootStore {
  constructor() {
    this.appStore = new AppStore();
    this.explorerStore = new ExplorerStore();
    this.transectStore = new TransectStore(this);
  }
}

export function createRootStore() {
  return new RootStore();
}
