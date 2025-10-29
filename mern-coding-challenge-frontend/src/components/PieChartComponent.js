// src/components/PieChartComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const generateColors = (num) => {
  const colorPalette = [
    'rgba(102, 126, 234, 0.8)',
    'rgba(240, 147, 251, 0.8)',
    'rgba(79, 172, 254, 0.8)',
    'rgba(245, 87, 108, 0.8)',
    'rgba(132, 250, 176, 0.8)',
    'rgba(252, 182, 159, 0.8)',
    'rgba(168, 181, 255, 0.8)',
    'rgba(255, 195, 113, 0.8)',
  ];
  
  const colors = [];
  for(let i = 0; i < num; i++) {
    if (i < colorPalette.length) {
      colors.push(colorPalette[i]);
    } else {
      const hue = Math.floor((360 / num) * i);
      colors.push(`hsla(${hue}, 70%, 60%, 0.8)`);
    }
  }
  return colors;
}

const PieChartComponent = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPieData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pie-chart`, {
        params: { month: selectedMonth }
      });
      setPieData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPieData();
    // eslint-disable-next-line
  }, [selectedMonth]);

  const colors = generateColors(pieData.length);
  
  const data = {
    labels: pieData.map(item => item.category),
    datasets: [
      {
        label: 'Items',
        data: pieData.map(item => item.count),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '600'
          },
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner"></div>
        <p>Loading chart...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        fontWeight: '700', 
        marginBottom: '10px',
        color: '#333'
      }}>
        🥧 Category Distribution - {selectedMonth}
      </h3>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
        Product category breakdown for the selected period
      </p>
      {pieData.length > 0 ? (
        <div style={{ height: '400px', position: 'relative' }}>
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '12px',
          color: '#999'
        }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            No data available for {selectedMonth}
          </p>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
