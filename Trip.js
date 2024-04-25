
/**
 * Define objects to represent locations (pickups, dropoffs, warehouses)
 * and trips (including pickups, dropoffs, and optional warehouses)
 * and shipments (including pickups and dropoffs) 
 * 
 */
class Location {
    constructor(name) {
      this.name = name;
    }
  }
  class Trip {
    constructor(pickups, dropoffs, warehouse) {
      this.pickups = pickups.slice(); // Defensive copy to avoid modifying original array
      this.dropoffs = dropoffs.slice(); // Defensive copy for dropoffs
      this.warehouse = warehouse;
    }
  
    // Helper method to check if a location exists in the trip (pickups or dropoffs)
    hasLocation(location) {
      return this.pickups.some(pickup => pickup.name === location.name) ||
             this.dropoffs.some(dropoff => dropoff.name === dropoff.name);
    }
  }
  class Shipment {
    constructor(pickups, dropoffs) {
      this.pickups = pickups.slice(); // Defensive copy for pickups
      this.dropoffs = dropoffs.slice(); // Defensive copy for dropoffs
    }
  }
  
  /**
   *  Validate a set of trips for a shipment and return true if valid, false otherwise  
   * 
   * @param {*} trip 
   * @param {*} shipment 
   * @returns 
   */
  function validateTrip(trip, shipment) {
    /**
     * Check if all pickup locations in the trip exist in the shipment's pickups 
     * and if all dropoff locations in the trip exist in the shipment's dropoffs 
     * and if no location appears in both pickups and dropoffs within the same trip
     *  
     */ 
    const allPickupsFound = shipment.pickups.every(pickup => trip.hasLocation(pickup));
    if (!allPickupsFound) {
      return false; 
    }
    const allDropoffsFound = shipment.dropoffs.every(dropoff => trip.hasLocation(dropoff));
    if (!allDropoffsFound) {
      return false;
    }
    const noDuplicateLocations = !trip.pickups.some(pickup => trip.dropoffs.some(dropoff => dropoff.name === pickup.name));
    if (!noDuplicateLocations) {
      return false;
    }
  
    return true;
  }
  

  /**
   * Validate a set of trips for a shipment and return true if valid, false otherwise 
   * @param {*} shipment 
   * @param {*} trips 
   * @returns 
   */
  function validateTrips(shipment, trips) {
    /**
     * Check if all shipment pickups are covered by at least one trip 
     * and if all shipment dropoffs are covered by at least one trip
     * and if no location appears in both pickups and dropoffs within the same trip 
     *  
     */
    const allPickupsCovered = shipment.pickups.every(pickup => trips.some(trip => trip.hasLocation(pickup)));
    if (!allPickupsCovered) {
      return false; 
    }
  
    const allDropoffsCovered = shipment.dropoffs.every(dropoff => trips.some(trip => trip.hasLocation(dropoff)));
    if (!allDropoffsCovered) {
      return false;
    }
  
    /**
     * Check if no location appears in both pickups and dropoffs within the same trip 
     */
    return trips.every(trip => validateTrip(trip, shipment));
  }