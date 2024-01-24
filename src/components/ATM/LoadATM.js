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
        <div className="flex min-h-screen mt-4 justify-center">
            <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                <form onSubmit={loadATM}>
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
                {message && <p className='mt-2'>{message}</p>}
            </div>
        </div>
    );
};

export default LoadATM;
