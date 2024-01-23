import React, { Component } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../pages/appConfig'

import Label from './Label';
import Input from './Input';
import SubmitButton from './SubmitButton';

const transactionFeeStructure = [
    { min: 0, max: 1000, fee: 10 },
    { min: 1001, max: 5000, fee: 20 },
    { min: 5001, max: 10000, fee: 30 },
    { min: 10001, max: 50000, fee: 40 },
    { min: 50001, max: 1000000000000, fee: 50 }
];

class TransferCash extends Component {
    state = {
        transferToOptions: [],  // Options for the transferTo dropdown
        transferTo: '',
        description: '',
        amount: 0,
        transactionFee: 0,
        response: null
    };

    componentDidMount() {
        this.fetchTransferToOptions();
    }

    fetchTransferToOptions = async () => {
        try {
            // API endpoint to fetch transferTo options
            const response = await axios.post(`${API_ENDPOINT}/api/SavingsAccount/ListSavingsAccounts`);
            this.setState({ transferToOptions: response.data });
        } catch (error) {
            console.error("Error fetching transfer options:", error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            if (name === 'amount') {
                this.calculateTransactionFee();
            }
        });
    };

    calculateTransactionFee = () => {
        const { amount } = this.state;
        const fee = transactionFeeStructure.find(range => amount >= range.min && amount <= range.max)?.fee || 0;
        this.setState({ transactionFee: fee });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { transferTo, description, amount, transactionFee } = this.state;
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
            // Handle response (e.g., show success message, clear form)
        } catch (error) {
            console.error("Error during the transfer:", error);
            // Handle error (e.g., show error message)
        }
    };

    renderTransferToOptions = () => {
        return this.state.transferToOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
        ));
    };

    render() {
        const { transferTo, description, amount } = this.state;

        return (
            <div className='mx-6'>
                <h2 className='text-center font-bold mb-2'>Transfer Funds</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='p-1'>
                        <Label name="Transfer To" />
                        <select
                            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-grey-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            name="transferTo"
                            value={transferTo}
                            onChange={this.handleInputChange}
                            required>
                            <option value="">Select a recipient</option>
                            {this.renderTransferToOptions()}
                        </select>
                    </div>
                    <div className='p-1'>
                        <Label name="Description" />
                        <Input type="text"
                            name="description"
                            value={description}
                            onChange={this.handleInputChange}></Input>
                    </div>
                    <div className='p-1'>
                        <Label name="Amount" />
                        <Input type="number"
                            name="amount"
                            value={amount}
                            onChange={this.handleInputChange}
                            required></Input>
                    </div>
                    <SubmitButton name="Transfer" />
                </form>
            </div>
        );
    }
}

export default TransferCash;
