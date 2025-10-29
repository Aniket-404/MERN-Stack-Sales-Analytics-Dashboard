import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`, {
        params: {
          month: selectedMonth,
          search,
          page,
          perPage
        }
      });
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedMonth, search]);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [page, selectedMonth, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleNext = () => {
    if (page * perPage < total) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="transaction-table">
      <h2>Transaction Records</h2>
      <div className="table-controls">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="results-count">
          Showing {transactions.length} of {total} results
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-table">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th style={{ width: '200px' }}>Product</th>
                <th>Description</th>
                <th style={{ width: '100px' }}>Price</th>
                <th style={{ width: '130px' }}>Category</th>
                <th style={{ width: '100px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map(tx => (
                <tr key={tx._id}>
                  <td>
                    <div className="product-image-wrapper">
                      <img 
                        src={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/image-proxy?url=${encodeURIComponent(tx.image)}`}
                        alt={tx.title}
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          console.log('❌ Image failed to load:', tx.image);
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          if (!e.target.nextSibling) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'image-placeholder';
                            placeholder.innerHTML = '<span>📦</span>';
                            e.target.parentNode.appendChild(placeholder);
                          }
                        }}
                        onLoad={(e) => {
                          console.log('✅ Image loaded:', tx.image);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <strong className="product-title">{truncateText(tx.title, 40)}</strong>
                      <code className="product-id">{tx._id.substring(0, 8)}...</code>
                    </div>
                  </td>
                  <td>
                    <span className="product-description" title={tx.description}>
                      {truncateText(tx.description, 80)}
                    </span>
                  </td>
                  <td>
                    <span className="product-price">${tx.price.toFixed(2)}</span>
                  </td>
                  <td>
                    <span className="category-badge">{tx.category}</span>
                  </td>
                  <td>
                    <span className={`sold-badge ${tx.sold ? 'yes' : 'no'}`}>
                      {tx.sold ? '✓ Sold' : '○ Available'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>
                    <div className="empty-state">
                      <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</span>
                      <p>No transactions found</p>
                      <small>Try adjusting your search or select a different month</small>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="pagination">
            <div className="pagination-info">
              Page <strong>{page}</strong> of <strong>{Math.ceil(total / perPage) || 1}</strong>
            </div>
            <div className="pagination-buttons">
              <button onClick={handlePrevious} disabled={page === 1}>
                ← Previous
              </button>
              <button onClick={handleNext} disabled={page * perPage >= total}>
                Next →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;
