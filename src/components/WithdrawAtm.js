import React, { Component } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../pages/appConfig'

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

class WithdrawAtm extends Component {
    state = {
        atmList: [],
        atmId: '',
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
            const response = await axios.post(`${API_ENDPOINT}/api/Atm/ListAtms`);
            this.setState({ transferToOptions: response.data });
        } catch (error) {
            console.error("Error fetching ATMs", error);
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
        const { atmId, description, amount, transactionFee } = this.state;
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
            // Handle response (e.g., show success message, clear form)
        } catch (error) {
            console.error("Error during the transfer:", error);
            // Handle error (e.g., show error message)
        }
    };

    renderAtmOptions = () => {
        return this.state.atmList.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
        ));
    };

    render() {
        const { atmList, description, amount } = this.state;

        return (
            <div className=''>
                <h2 className='text-center font-bold mb-2'>ATM Withdrawal</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='p-1'>
                        <Label name="ATMs" />
                        <DropDown 
                            name="atmList"
                            value={atmList}
                            onChange={this.handleInputChange}
                            options={this.renderAtmOptions()}
                            placeholder="Select an ATM"/>
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
                    <SubmitButton name="Withdraw" />
                </form>
            </div>
        );
    }
}

export default WithdrawAtm;
