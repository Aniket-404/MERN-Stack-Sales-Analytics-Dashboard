// src/App.js

import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChartComponent from './components/BarChartComponent';
import './App.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="container">
      <h1>MERN Stack Coding Challenge</h1>
      <div className="controls">
        <div>
          <label htmlFor="month-select">Select Month: </label>
          <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <StatisticsBox selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
      <div className="charts">
        <BarChartComponent selectedMonth={selectedMonth} />
        {/* <PieChartComponent selectedMonth={selectedMonth} /> */}
      </div>
    </div>
  );
};

export default App;
