import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSold: 0,
    totalNotSold: 0
  });

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/data/statistics.json');
      
      console.log('Fetched statistics data:', response.data);
      
      const selectedStats = response.data[selectedMonth];

      if (selectedStats) {
        console.log(`Statistics for month ${selectedMonth}:`, selectedStats);

        setStatistics({
          totalSales: selectedStats.totalSales || 0,
          totalSold: selectedStats.totalSold || 0, 
          totalNotSold: selectedStats.totalNotSold || 0 
        });
      } else {
        console.log(`No statistics found for month ${selectedMonth}`);

        setStatistics({
          totalSales: 0,
          totalSold: 0,
          totalNotSold: 0
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]); 

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
