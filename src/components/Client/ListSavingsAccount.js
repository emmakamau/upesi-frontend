import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../../pages/appConfig';
import { Input } from "@material-tailwind/react";
import { Table } from '../Table';

const ListSavingsAccount = () => {
    const [SavingsAccounts, setSavingsAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSavingsAccounts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/SavingsAccount/ListSavingsAccounts`);
                setSavingsAccounts(response.data);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchSavingsAccounts();
    }, []);

    const renderRow = (SavingsAccount) => (
        <tr key={SavingsAccount.id}>
            <td className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>{SavingsAccount.id}</td>
            <td className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>{SavingsAccount.userName}</td>
            <td className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>{SavingsAccount.balance}</td>
        </tr>
    );

    const filteredSavingsAccounts = searchQuery
        ? SavingsAccounts.filter((SavingsAccount) =>
            SavingsAccount.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            SavingsAccount.balance.toString().includes(searchQuery))
        : SavingsAccounts;

    return (
        <div className="my-6">
            <div className="mx-6">
                <Input
                    placeholder='Search'
                    className='border-1 border-gray-300 bg-white px-5 pr-16 rounded-lg text-sm focus:outline-none'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>There was an error loading the SavingsAccounts: {error}</p>
                ) : (
                    <Table
                        tableHead={["Id", "Username", "Balance"]}
                        tableRows={filteredSavingsAccounts}
                        renderRow={renderRow}
                    />
                )}
            </div>
        </div>
    );
};

export default ListSavingsAccount;
