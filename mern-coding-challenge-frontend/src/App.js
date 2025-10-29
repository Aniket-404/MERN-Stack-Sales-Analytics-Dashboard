import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import './App.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="background-decoration">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-title">
              <span className="icon">📊</span>
              <h1>Sales Analytics Dashboard</h1>
            </div>
            <div className="header-subtitle">
              <p>Real-time insights and performance metrics</p>
            </div>
          </div>
          
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <div className="month-selector">
              <label htmlFor="month-select">
                <span className="label-icon">📅</span>
                Select Period
              </label>
              <select 
                id="month-select" 
                value={selectedMonth} 
                onChange={handleMonthChange}
                className="month-select"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <StatisticsBox selectedMonth={selectedMonth} />
        
        <section className="content-section">
          <TransactionsTable selectedMonth={selectedMonth} />
        </section>
        
        <section className="charts-section">
          <div className="section-header">
            <h2>📈 Visual Analytics</h2>
            <p>Comprehensive data visualization for better insights</p>
          </div>
          <div className="charts-grid">
            <div className="chart-container">
              <BarChartComponent selectedMonth={selectedMonth} />
            </div>
            <div className="chart-container">
              <PieChartComponent selectedMonth={selectedMonth} />
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>© 2025 Sales Analytics Dashboard | Built with MERN Stack</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
