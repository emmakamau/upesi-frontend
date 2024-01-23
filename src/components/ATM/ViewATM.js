import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../../pages/appConfig';
import { Input } from "@material-tailwind/react";
import { Table } from '../Table';

const ViewATM = () => {
    const [atms, setATMs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchATMs = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/ATM/ListAtms`);
                setATMs(response.data);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchATMs();
    }, []);

    const renderRow = (atm) => (
        <tr key={atm.id}>
            <td className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>{atm.location}</td>
            <td className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>{atm.balance}</td>
        </tr>
    );

    const filteredATMs = searchQuery
        ? atms.filter((atm) =>
            atm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            atm.balance.toString().includes(searchQuery))
        : atms;

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
                    <p>There was an error loading the ATMs: {error}</p>
                ) : (
                    <Table
                        tableHead={["Location", "Balance"]}
                        tableRows={filteredATMs}
                        renderRow={renderRow}
                    />
                )}
            </div>
        </div>
    );
};

export default ViewATM;
