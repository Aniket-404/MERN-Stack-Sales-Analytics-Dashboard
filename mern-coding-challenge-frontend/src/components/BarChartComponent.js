import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import the Bar component from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import necessary components from Chart.js

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  // State for storing the data to be displayed in the bar chart
  const [barChartData, setBarChartData] = useState({
    labels: [], // This will hold the month names
    totalSalesData: [],
    totalSoldData: [],
    totalNotSoldData: [],
  });

  // Fetch statistics from the backend
  const fetchBarChartData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/data/statistics.json');

      const labels = Object.keys(response.data); // Get the month names

      // Initialize data arrays
      const totalSalesData = [];
      const totalSoldData = [];
      const totalNotSoldData = [];

      // Iterate over each month's data and populate the arrays
      labels.forEach(month => {
        const monthData = response.data[month];
        totalSalesData.push(monthData.totalSales || 0);
        totalSoldData.push(monthData.totalSold || 0);
        totalNotSoldData.push(monthData.totalNotSold || 0);
      });

      // Update state with fetched data
      setBarChartData({
        labels,
        totalSalesData,
        totalSoldData,
        totalNotSoldData,
      });
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  }, []);

  // Trigger data fetch when the component mounts
  useEffect(() => {
    fetchBarChartData();
  }, [fetchBarChartData]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0 auto', width: '100%' }}>
      <div style={{ width: '45%', height: '400px' }}>
        <h3>Total Sales</h3>
        <Bar
          data={{
            labels: barChartData.labels,
            datasets: [
              {
                label: 'Total Sales',
                data: barChartData.totalSalesData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Sales',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          }}
          height={400} // Fixed height
        />
      </div>

      <div style={{ width: '45%', height: '400px' }}>
        <h3>Total Sold and Not Sold</h3>
        <Bar
          data={{
            labels: barChartData.labels,
            datasets: [
              {
                label: 'Total Sold Items',
                data: barChartData.totalSoldData,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
              },
              {
                label: 'Total Not Sold Items',
                data: barChartData.totalNotSoldData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          }}
          height={400} // Fixed height
        />
      </div>
    </div>
  );
};

export default BarChartComponent;
