

/**
 * Get monthly active users from the data array and return them as an array of objects.
 */
function getMonthlyActiveUsers(data) {
    /**
     * Initialize monthlyActiveUsers and lastActiveTimestamps objects with empty sets.
     * This will be used to keep track of active users for each month.
     * The keys will be the month numbers (0-11) and the values will be sets of user IDs.
     * lastActiveTimestamps will be used to keep track of the last active timestamp for each user.
     * The keys will be the user IDs and the values will be the last active timestamps.
     */
    const monthlyActiveUsers = {};
    let lastActiveTimestamps = {};
  
    /**
     * Iterate through each entry in the data array
     * and update the monthly active users and last active timestamps
     * based on the logged_in, logged_out, and lastSeenAt fields
     * in the entry.
     */
    data.forEach(userEntry => {
      const userId = userEntry.userId;
      const timestamps = [userEntry.logged_in, userEntry.logged_out, userEntry.lastSeenAt]
        .sort((a, b) => a - b)
        .filter(Boolean);
  /**
   * If there are no timestamps, skip this iteration
   */
      if (timestamps.length === 0) return; 

      /**
       * Iterate through each timestamp in the timestamps array 
       * and update the monthly active users and last active timestamps
       * based on the timestamp.
       * If the timestamp is not the user's logged_in timestamp, skip it.
       * If the timestamp is before the user's last active timestamp, skip it.
       * If the timestamp is after the user's last active timestamp, update the user's last active timestamp.
       */
  
      for (const timestamp of timestamps) {
        const month = timestamp.getMonth();
  
        if (timestamp !== userEntry.logged_in) continue; 
  
        const isActive = timestamp >= lastActiveTimestamps[userId];
        /**
         * If the user is active, add them to the monthly active users set
         * or delete them from the monthly active users set.
         * If the user is not active, delete them from the monthly active users set.
         */
        if (isActive) {
          monthlyActiveUsers[month] = monthlyActiveUsers[month] || new Set();
          monthlyActiveUsers[month].add(userId);
        } else {
          monthlyActiveUsers[month].delete(userId);
        }
        lastActiveTimestamps[userId] = timestamp;
      }
    });
    /**
     * Return an array of objects with the month and active users for each month
     * from the monthlyActiveUsers object.
     * The month will be the key and the active users will be the value.
     * 
     */
    return Object.entries(monthlyActiveUsers).map(([month, userIds]) => ({
      month: parseInt(month),
      activeUsers: userIds.size,
    }));
  }
  