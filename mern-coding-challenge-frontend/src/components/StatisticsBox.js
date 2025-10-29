import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSold: 0,
    totalNotSold: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.get(`${backendUrl}/api/statistics`);
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
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  if (isLoading) {
    return (
      <div className="statistics-box">
        {[1, 2, 3].map(i => (
          <div key={i} className="stat-card skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="statistics-box">
      <div className="stat-card sales">
        <div className="stat-header">
          <span className="stat-icon">💰</span>
          <h3>Total Sales</h3>
        </div>
        <div className="stat-value">${Number(statistics.totalSales).toLocaleString()}</div>
        <div className="stat-change positive">
          <span>↑</span>
          <span>Revenue Generated</span>
        </div>
      </div>
      
      <div className="stat-card sold">
        <div className="stat-header">
          <span className="stat-icon">✅</span>
          <h3>Total Sold Items</h3>
        </div>
        <div className="stat-value">{statistics.totalSold}</div>
        <div className="stat-change positive">
          <span>↑</span>
          <span>Successfully Sold</span>
        </div>
      </div>
      
      <div className="stat-card not-sold">
        <div className="stat-header">
          <span className="stat-icon">📦</span>
          <h3>Total Not Sold Items</h3>
        </div>
        <div className="stat-value">{statistics.totalNotSold}</div>
        <div className="stat-change">
          <span>📊</span>
          <span>In Inventory</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;
