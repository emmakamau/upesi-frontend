import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../pages/appConfig';

import Label from './Label';
import Input from './Input';
import SubmitButton from './SubmitButton';
import DropDown from './DropDown';

const transactionFeeStructure = [
    { min: 0, max: 1000, fee: 20 },
    { min: 1001, max: 5000, fee: 30 },
    { min: 5001, max: 10000, fee: 40 },
    { min: 10001, max: 50000, fee: 50 },
    { min: 50001, max: 1000000000000, fee: 60 }
];

const WithdrawAtm = () => {
    const [atmList, setAtmList] = useState([]);
    const [atmId, setAtmId] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactionFee, setTransactionFee] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAtms = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/Atm/ListAtms`);
                setAtmList(response.data.map(atm => ({
                    value: atm.id,
                    label: `${atm.location}`
                })));
            } catch (error) {
                console.error("Error fetching ATMs", error);
                setMessage("Error fetching ATMs: " + error.message);
            }
        };

        fetchAtms();
    }, []);

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'amount':
                setAmount(value);
                calculateTransactionFee(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'atmId':
                setAtmId(value);
                break;
            default:
                break;
        }
    };

    const calculateTransactionFee = (amount) => {
        const fee = transactionFeeStructure.find(range => amount >= range.min && amount <= range.max)?.fee || 0;
        setTransactionFee(fee);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('userId');

        try {
            const response = await axios.post(`${API_ENDPOINT}/api/Transactions/WithdrawFromAtm`, {
                atmId,
                userId,
                description,
                amount: Number(amount),
                transactionFee
            });
            console.log(response.data);
            setMessage("Withdrawal successfully completed");

            // Reset form fields
            setAtmId('');
            setDescription('');
            setAmount(0);
        } catch (error) {
            console.error("Error during the transfer:", error);
            setMessage(error.response.data);
        }
    };

    return (
        <div>
            <h2 className='text-center font-bold mb-2'>ATM Withdrawal</h2>
            <form onSubmit={handleSubmit}>
                <div className='p-1'>
                    <Label name="ATMs" />
                    <DropDown
                        name="atmId"
                        value={atmId}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        options={atmList}
                        placeholder="Select an ATM" />
                </div>
                <div className='p-1'>
                    <Label name="Description" />
                    <Input type="text"
                        name="description"
                        value={description}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                </div>
                <div className='p-1'>
                    <Label name="Amount" />
                    <Input type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        required />
                </div>
                <SubmitButton name="Withdraw" />
            </form>
            {message && <p className='mt-2 text-center'>{message}</p>}
        </div>
    );
}

export default WithdrawAtm;
