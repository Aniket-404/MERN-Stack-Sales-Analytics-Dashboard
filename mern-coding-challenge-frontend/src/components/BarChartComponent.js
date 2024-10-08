import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    totalSalesData: [],
    totalSoldData: [],
    totalNotSoldData: [],
  });

  const fetchBarChartData = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/statistics.json`);

      const labels = Object.keys(response.data); 

      const totalSalesData = [];
      const totalSoldData = [];
      const totalNotSoldData = [];

      labels.forEach(month => {
        const monthData = response.data[month];
        totalSalesData.push(monthData.totalSales || 0);
        totalSoldData.push(monthData.totalSold || 0);
        totalNotSoldData.push(monthData.totalNotSold || 0);
      });

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
          height={400}
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
          height={400}
        />
      </div>
    </div>
  );
};

export default BarChartComponent;
