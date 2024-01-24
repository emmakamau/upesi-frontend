import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../../pages/appConfig'; // Make sure this points to your API

import Label from "../Label";
import Input from "../Input";
import SubmitButton from "../SubmitButton";
import DropDown from '../DropDown';

const LoadATM = () => {
    const [amount, setAmount] = useState('');
    const [atmId, setAtmId] = useState('');
    const [atmList, setAtmList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAtmList = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/ATM/ListAtms`);
                setAtmList(response.data.map(atm => ({
                    value: atm.id,
                    label: `${atm.location}`
                })));
            } catch (error) {
                setMessage('Error fetching ATMs: ' + error.message);
            }
        };

        fetchAtmList();
    }, []);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleAtmIdChange = (event) => {
        setAtmId(event.target.value);
    };

    const loadATM = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${API_ENDPOINT}/api/ATM/LoadAtm?id=${atmId}&amount=${parseFloat(amount)}`);
            setMessage("ATM Loaded successfully!");
            setAmount('');
            setAtmId('');
        } catch (error) {
            setMessage('Error loading ATM: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex mt-4 justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <h5 className="text-xl font-medium mb-6">Load ATM</h5>
                <form onSubmit={loadATM} className="space-y-6">
                    <div>
                        <Label name="Select ATM" />
                        <DropDown
                            name="atmId"
                            value={atmId}
                            onChange={handleAtmIdChange}
                            options={atmList}
                        />
                    </div>
                    <div>
                        <Label name="Amount" />
                        <Input type="number" value={amount} onChange={handleAmountChange} required />
                    </div>
                    <SubmitButton name="Submit" />
                </form>
                {message && (
                    <div className="mt-3 text-center text-sm font-medium p-2.5 
                            text-green-800 bg-green-100 rounded-lg">
                        {message}
                    </div>
                )}
            </div>
        </div>

    );
};

export default LoadATM;
