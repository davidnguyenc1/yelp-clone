/**
 * Formats distance in meters to a human-readable string
 * @param {number} distanceInMeters - Distance in meters
 * @returns {string} Formatted distance (e.g., "0.5 mi", "1.2 km")
 */
export function formatDistance(distanceInMeters) {
  if (!distanceInMeters && distanceInMeters !== 0) return "";
  
  // Convert meters to miles
  const miles = distanceInMeters * 0.000621371;
  
  if (miles < 0.1) {
    // Show in feet if less than 0.1 miles
    const feet = distanceInMeters * 3.28084;
    return `${Math.round(feet)} ft`;
  } else if (miles < 1) {
    // Show in tenths of a mile
    return `${miles.toFixed(1)} mi`;
  } else {
    // Show in miles with one decimal
    return `${miles.toFixed(1)} mi`;
  }
}

/**
 * Calculates the distance between two coordinates using the Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in meters
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
