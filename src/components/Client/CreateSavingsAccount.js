import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from '../../pages/appConfig';

import Label from "../Label";
import DropDown from "../DropDown";
import SubmitButton from "../SubmitButton";
import Input from "../Input";

const CreateSavingsAccount = () => {
    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const accessToken = sessionStorage.getItem('accessToken');
                const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                const response = await axios.get(`${API_ENDPOINT}/api/User/ListUsersWithNoSavingsAccount`, config);
                setUsers(response.data.map(user => ({
                    value: user.userId,
                    label: `${user.userName}`
                })));
            } catch (error) {
                setMessage('Error fetching Users: ' + error.message);
            } 
        };

        fetchUsersList();
    }, []);

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setDepositAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            userId: selectedUserId,
            depositAmount: parseFloat(depositAmount),
        };

        try {
            // Send payload to your backend
            console.log('Submitting', payload);
            const response = await axios.post(`${API_ENDPOINT}/api/SavingsAccount/CreateSavingsAccount`, payload);
            console.log('Response', response);
            setMessage("Account created successfully");
            // Reset form fields
            setSelectedUserId('');
            setDepositAmount(0);
        }
        catch (err) { console.error("Error", err); setMessage("Error", err) }

    };

    return (
        <div className="flex mt-4 justify-center">
            <div className="p-4 relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className='p-1'>
                        <Label name="Select User" />
                        <DropDown
                            name="users"
                            value={selectedUserId}
                            onChange={handleUserChange}
                            options={users}
                            placeholder="Select a user..."
                        />
                    </div>
                    <div className='p-1'>
                        <Label name="Deposit Amount" />
                        <Input type="number"
                            name="depositamount"
                            value={depositAmount}
                            onChange={handleAmountChange}
                            required></Input>
                    </div>
                    <SubmitButton name="Create" />
                </form>
                {message && <p className='mt-2'>{message}</p>}
            </div>
        </div>
    );
};

export default CreateSavingsAccount;
