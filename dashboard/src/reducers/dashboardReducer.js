const initialState = {
    // Today's Highlights
    totalOrders: 123456,
    totalTrips: 123456,
    totalRevenue: 123456,
    totalExpenses: 123456,
    income: 123456,
  
   
    upcomingActivities: [],
    completedActivities: [],
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      // Add actions to update state based on user interactions or data fetching
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  