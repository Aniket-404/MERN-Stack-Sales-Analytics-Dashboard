import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const StatisticsBox = ({ selectedMonth }) => {
  // Initialize state variables for statistics
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSold: 0,
    totalNotSold: 0
  });

  // Define the fetchStatistics function and wrap it in useCallback to avoid the dependency error
  const fetchStatistics = useCallback(async () => {
    try {
      // Fetch the statistics.json file directly from the backend server
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/statistics.json`);
      
      // Log the full response data for testing purposes
      console.log('Fetched statistics data:', response.data);
      
      // Use the selectedMonth as the key (assuming selectedMonth is a string like "January", etc.)
      const selectedStats = response.data[selectedMonth];

      if (selectedStats) {
        // Log the specific data for the selected month
        console.log(`Statistics for month ${selectedMonth}:`, selectedStats);

        // Store the values in the state variables
        setStatistics({
          totalSales: selectedStats.totalSales || 0,
          totalSold: selectedStats.totalSold || 0,  // Using totalSold from the fetched data
          totalNotSold: selectedStats.totalNotSold || 0 // Using totalNotSold from the fetched data
        });
      } else {
        // Log that no statistics were found for the selected month
        console.log(`No statistics found for month ${selectedMonth}`);

        // Reset if no statistics found for the selected month
        setStatistics({
          totalSales: 0,
          totalSold: 0,
          totalNotSold: 0
        });
      }
    } catch (error) {
      // Log any errors encountered during the fetch
      console.error('Error fetching statistics:', error);
    }
  }, [selectedMonth]); // Dependencies: re-fetch whenever selectedMonth changes

  // Trigger data fetch when the component mounts or the selected month changes
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]); // Include the memoized fetchStatistics in dependency array

  return (
    <div>
      <h2>Statistics - Month {selectedMonth}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={boxStyle}>
          <h3>Total Sales</h3>
          <p>${Number(statistics.totalSales).toLocaleString()}</p>
        </div>
        <div style={boxStyle}>
          <h3>Total Sold Items</h3>
          <p>{statistics.totalSold}</p>
        </div>
        <div style={boxStyle}>
          <h3>Total Not Sold Items</h3>
          <p>{statistics.totalNotSold}</p>
        </div>
      </div>
    </div>
  );
};

const boxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '5px',
  width: '30%',
  textAlign: 'center',
  boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
};

export default StatisticsBox;
