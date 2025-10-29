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
  const [isLoading, setIsLoading] = useState(true);

  const fetchBarChartData = useCallback(async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBarChartData();
  }, [fetchBarChartData]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner"></div>
        <p>Loading charts...</p>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: '600'
          },
          padding: 15,
          usePointStyle: true,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          fontWeight: '700', 
          marginBottom: '10px',
          color: '#333'
        }}>
          💰 Total Sales Overview
        </h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
          Monthly sales revenue across all periods
        </p>
        <div style={{ height: '350px' }}>
          <Bar
            data={{
              labels: barChartData.labels,
              datasets: [
                {
                  label: 'Total Sales ($)',
                  data: barChartData.totalSalesData,
                  backgroundColor: 'rgba(102, 126, 234, 0.8)',
                  borderColor: 'rgba(102, 126, 234, 1)',
                  borderWidth: 2,
                  borderRadius: 8,
                  hoverBackgroundColor: 'rgba(102, 126, 234, 1)',
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  title: {
                    display: true,
                    text: 'Sales Amount ($)',
                    font: {
                      size: 12,
                      weight: 'bold'
                    }
                  },
                },
                x: {
                  ...chartOptions.scales.x,
                  title: {
                    display: true,
                    text: 'Months',
                    font: {
                      size: 12,
                      weight: 'bold'
                    }
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          fontWeight: '700', 
          marginBottom: '10px',
          color: '#333'
        }}>
          📊 Inventory Status
        </h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
          Comparison of sold vs. unsold items by month
        </p>
        <div style={{ height: '350px' }}>
          <Bar
            data={{
              labels: barChartData.labels,
              datasets: [
                {
                  label: 'Sold Items',
                  data: barChartData.totalSoldData,
                  backgroundColor: 'rgba(240, 147, 251, 0.8)',
                  borderColor: 'rgba(240, 147, 251, 1)',
                  borderWidth: 2,
                  borderRadius: 8,
                  hoverBackgroundColor: 'rgba(240, 147, 251, 1)',
                },
                {
                  label: 'Unsold Items',
                  data: barChartData.totalNotSoldData,
                  backgroundColor: 'rgba(79, 172, 254, 0.8)',
                  borderColor: 'rgba(79, 172, 254, 1)',
                  borderWidth: 2,
                  borderRadius: 8,
                  hoverBackgroundColor: 'rgba(79, 172, 254, 1)',
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  title: {
                    display: true,
                    text: 'Item Count',
                    font: {
                      size: 12,
                      weight: 'bold'
                    }
                  },
                },
                x: {
                  ...chartOptions.scales.x,
                  title: {
                    display: true,
                    text: 'Months',
                    font: {
                      size: 12,
                      weight: 'bold'
                    }
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
