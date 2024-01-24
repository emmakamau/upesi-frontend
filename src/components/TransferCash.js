import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../pages/appConfig';

import Label from './Label';
import Input from './Input';
import SubmitButton from './SubmitButton';
import DropDown from './DropDown';

const transactionFeeStructure = [
    { min: 0, max: 1000, fee: 10 },
    { min: 1001, max: 5000, fee: 20 },
    { min: 5001, max: 10000, fee: 30 },
    { min: 10001, max: 50000, fee: 40 },
    { min: 50001, max: 1000000000000, fee: 50 }
];

const TransferCash = () => {
    const [transferToOptions, setTransferToOptions] = useState([]);
    const [transferTo, setTransferTo] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [transactionFee, setTransactionFee] = useState(0);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchTransferToOptions = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/SavingsAccount/ListSavingsAccounts`);
                setTransferToOptions(response.data.map(user => ({
                    value: user.userId,
                    label: `${user.userName}`
                })));
            } catch (error) {
                console.error("Error fetching transfer options:", error);
            }
        };

        fetchTransferToOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'transferTo':
                setTransferTo(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'amount':
                setAmount(value);
                calculateTransactionFee(value);
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
        const transferFrom = sessionStorage.getItem('userId');

        try {
            const response = await axios.post(`${API_ENDPOINT}/api/Transactions/BankTransfer`, {
                transferFrom,
                transferTo,
                description,
                amount: Number(amount),
                transactionFee
            });
            console.log(response.data);
            setResponse("Withdrawal successfully completed");

            // Reset form fields after successful transfer
            setTransferTo('');
            setDescription('');
            setAmount(0);
        } catch (error) {
            console.error("Error during the transfer:", error.message);
            setResponse(error.response.data); 
        }
    };

    return (
        <div>
            <h2 className='text-center font-bold mb-2'>Transfer Funds</h2>
            <form onSubmit={handleSubmit}>
                <div className='p-1'>
                    <Label name="Transfer To" />
                    <DropDown 
                        name="transferTo"
                        value={transferTo}
                        onChange={handleInputChange}
                        options={transferToOptions}
                        placeholder="Select a recipient"/>
                </div>
                <div className='p-1'>
                    <Label name="Description" />
                    <Input type="text"
                        name="description"
                        value={description}
                        onChange={handleInputChange}></Input>
                </div>
                <div className='p-1'>
                    <Label name="Amount" />
                    <Input type="number"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                        required></Input>
                </div>
                <SubmitButton name="Transfer" />
            </form>
            {response && <p className='mt-2 text-center'>{response}</p>}
        </div>
    );
};

export default TransferCash;
