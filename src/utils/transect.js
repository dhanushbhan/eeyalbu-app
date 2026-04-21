const EARTH_RADIUS_METERS = 6371000;

function toRadians(value) {
  return (value * Math.PI) / 180;
}

export function distanceBetweenCoordinates(start, end) {
  if (!start || !end) {
    return 0;
  }

  const [startLng, startLat] = start;
  const [endLng, endLat] = end;

  const deltaLat = toRadians(endLat - startLat);
  const deltaLng = toRadians(endLng - startLng);
  const lat1 = toRadians(startLat);
  const lat2 = toRadians(endLat);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getPathDistanceMeters(coordinates) {
  if (!coordinates || coordinates.length < 2) {
    return 0;
  }

  return coordinates.slice(1).reduce((total, currentCoordinate, index) => {
    return total + distanceBetweenCoordinates(coordinates[index], currentCoordinate);
  }, 0);
}

export function buildLineFeature(coordinates) {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}

export function buildPointFeatures(coordinates) {
  return coordinates.map((coordinate, index) => ({
    type: "Feature",
    properties: {
      index,
    },
    geometry: {
      type: "Point",
      coordinates: coordinate,
    },
  }));
}

export function createEmptyFeatureCollection() {
  return {
    type: "FeatureCollection",
    features: [],
  };
}
