import { makeAutoObservable, runInAction } from "mobx";
import {
  buildLineFeature,
  buildPointFeatures,
  createEmptyFeatureCollection,
  getPathDistanceMeters,
} from "../utils/transect";

const DEFAULT_TRANSECT_ENDPOINT =
  import.meta.env.VITE_TRANSECT_API_URL ?? "http://127.0.0.1:8000/transect";

export class TransectStore {
  rootStore;
  isDrawing = false;
  draftCoordinates = [];
  hoverCoordinate = null;
  transectSamples = [];
  isLoading = false;
  error = null;
  statusMessage = "Click Start drawing to sketch a transect on the map.";
  maxDistanceMeters = 5000;
  endpoint = DEFAULT_TRANSECT_ENDPOINT;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
  }

  get canFinish() {
    return this.isDrawing && this.draftCoordinates.length >= 2;
  }

  get totalDistanceMeters() {
    return getPathDistanceMeters(this.draftCoordinates);
  }

  get totalDistanceLabel() {
    return `${(this.totalDistanceMeters / 1000).toFixed(2)} km`;
  }

  get previewCoordinates() {
    if (this.isDrawing && this.hoverCoordinate && this.draftCoordinates.length > 0) {
      return [...this.draftCoordinates, this.hoverCoordinate];
    }

    return this.draftCoordinates;
  }

  get lineFeatureCollection() {
    if (this.previewCoordinates.length < 2) {
      return createEmptyFeatureCollection();
    }

    return {
      type: "FeatureCollection",
      features: [buildLineFeature(this.previewCoordinates)],
    };
  }

  get pointFeatureCollection() {
    if (this.draftCoordinates.length === 0) {
      return createEmptyFeatureCollection();
    }

    return {
      type: "FeatureCollection",
      features: buildPointFeatures(this.draftCoordinates),
    };
  }

  resetDraft() {
    this.draftCoordinates = [];
    this.hoverCoordinate = null;
  }

  startDrawing() {
    this.isDrawing = true;
    this.resetDraft();
    this.transectSamples = [];
    this.error = null;
    this.statusMessage = "Click on the map to add vertices. Keep the transect under 5 km.";
  }

  stopDrawing() {
    this.isDrawing = false;
    this.hoverCoordinate = null;
  }

  updateHoverCoordinate(coordinate) {
    if (!this.isDrawing || this.draftCoordinates.length === 0) {
      this.hoverCoordinate = null;
      return;
    }

    const proposedCoordinates = [...this.draftCoordinates, coordinate];

    if (getPathDistanceMeters(proposedCoordinates) > this.maxDistanceMeters) {
      this.hoverCoordinate = null;
      this.error = "The transect cannot exceed 5 km.";
      return;
    }

    this.hoverCoordinate = coordinate;
    this.error = null;
  }

  addCoordinate(coordinate) {
    if (!this.isDrawing) {
      return;
    }

    const proposedCoordinates = [...this.draftCoordinates, coordinate];

    if (proposedCoordinates.length > 1 && getPathDistanceMeters(proposedCoordinates) > this.maxDistanceMeters) {
      this.error = "The transect cannot exceed 5 km.";
      return;
    }

    this.draftCoordinates = proposedCoordinates;
    this.error = null;
    this.statusMessage =
      proposedCoordinates.length >= 2
        ? `Transect length: ${this.totalDistanceLabel}. Click Done to sample the rasters.`
        : "Add at least one more point to complete the transect.";
  }

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  async finishDrawing() {
    if (!this.canFinish) {
      this.error = "Add at least two points before finishing the transect.";
      return;
    }

    this.stopDrawing();
    await this.fetchTransectSamples();
  }

  async fetchTransectSamples() {
    this.isLoading = true;
    this.error = null;
    this.statusMessage = "Sampling environmental rasters along the transect...";

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          geometry: {
            type: "LineString",
            coordinates: this.draftCoordinates,
          },
          max_distance_m: this.maxDistanceMeters,
        }),
      });

      if (!response.ok) {
        throw new Error(`Transect request failed with status ${response.status}.`);
      }

      const payload = await response.json();
      const samples = Array.isArray(payload.samples) ? payload.samples : [];

      runInAction(() => {
        this.transectSamples = samples;
        this.statusMessage =
          samples.length > 0
            ? `Loaded ${samples.length} transect samples across ${this.totalDistanceLabel}.`
            : "The transect request succeeded but returned no samples.";
      });
    } catch (error) {
      runInAction(() => {
        this.transectSamples = [];
        this.error =
          error instanceof Error
            ? `${error.message} Add the backend endpoint next and this graph will populate automatically.`
            : "Transect sampling failed.";
        this.statusMessage = "Transect drawing saved, but the backend sampling is not ready yet.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
