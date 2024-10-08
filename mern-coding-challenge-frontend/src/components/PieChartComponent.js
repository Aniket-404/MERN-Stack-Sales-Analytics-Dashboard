// src/components/PieChartComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const generateColors = (num) => {
  const colors = [];
  for(let i = 0; i < num; i++) {
    const hue = Math.floor((360 / num) * i);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}

const PieChartComponent = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);

  const fetchPieData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pie-chart`, {
        params: { month: selectedMonth }
      });
      setPieData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchPieData();
    // eslint-disable-next-line
  }, [selectedMonth]);

  const data = {
    labels: pieData.map(item => item.category),
    datasets: [
      {
        label: 'Category Distribution',
        data: pieData.map(item => item.count),
        backgroundColor: generateColors(pieData.length),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: `Category Distribution for ${selectedMonth}` }
    }
  };

  return (
    <div style={{ width: '48%' }}>
      <h2>Category Distribution Pie Chart - {selectedMonth}</h2>
      {pieData.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChartComponent;
