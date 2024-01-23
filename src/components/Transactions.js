import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@material-tailwind/react";
import { Table } from './Table';

import API_ENDPOINT from '../pages/appConfig';

const Transactions = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const endpoint = userId 
          ? `${API_ENDPOINT}/api/Transactions/ListTransactions/${userId}` // API endpoint to fetch transactions for a specific user
          : `${API_ENDPOINT}/api/Transactions/ListTransactions`; // API endpoint to fetch all transactions
        const response = await axios.get(endpoint);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const filteredTransactions = transactions.filter(
    transaction => transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRow = (transaction, index) => (
    <tr key={index}>
      <td>{transaction.id}</td>
      <td>{transaction.userId}</td>
      <td>{transaction.description}</td>
      <td>{transaction.timestamp}</td>
      <td>{transaction.amount}</td>
    </tr>
  );

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className='mt-4 px-4'>
      <Input
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table
        tableHead={["Id", "User", "Description", "Amount", "TimeStamp"]}
        tableRows={filteredTransactions}
        renderRow={renderRow}
      />
    </div>
  );
};

export default Transactions;
