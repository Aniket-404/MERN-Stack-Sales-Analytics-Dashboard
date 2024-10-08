// src/components/TransactionsTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 3; // Set perPage to 10
  const [total, setTotal] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
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
    }
  };

  useEffect(() => {
    setPage(1); // Reset to first page when month or search changes
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

  return (
    <div>
      <h2>Transactions</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search transaction" 
          value={search} 
          onChange={handleSearchChange} 
          style={{ padding: '8px', width: '200px' }}
        />
      </div>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx._id}</td>
              <td>{tx.title}</td>
              <td>{tx.description}</td>
              <td>${tx.price.toFixed(2)}</td>
              <td>{tx.category}</td>
              <td>{tx.sold ? 'Yes' : 'No'}</td>
              <td><img src={tx.image} alt={tx.title} width="50" /></td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page} of {Math.ceil(total / perPage)}</span>
        <button onClick={handleNext} disabled={page * perPage >= total}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
