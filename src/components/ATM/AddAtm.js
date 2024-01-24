import React, { Component } from "react";
import axios from "axios";
import Label from "../Label";
import Input from "../Input";
import SubmitButton from "../SubmitButton";

import API_ENDPOINT from "../../pages/appConfig";

export class AddATM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            balance: 0,
            successMessage: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: name === 'balance' ? parseFloat(value) : value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_ENDPOINT}/api/ATM/CreateAtm`, this.state);
            this.setState({
                location: '',
                balance: 0,
                successMessage: 'ATM successfully added.'
            });
            console.log(response.data);
            setTimeout(() => this.setState({ successMessage: '' }), 3000);
        } catch (error) {
            console.error('Error adding ATM:', error);
            this.setState({ successMessage: 'Failed to add ATM.' });
        }
    }

    render() {
        const { location, balance, successMessage } = this.state;
        return (
            <div className="flex mt-4 justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <h5 className="text-xl font-medium mb-6">Add New ATM</h5>
                <form onSubmit={this.handleSubmit} className="space-y-6">
                    <div>
                        <Label name="Location" />
                        <Input
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleInputChange}></Input>
                    </div>
                    <div>
                        <Label name="Amount" />
                        <Input
                            type="number"
                            name="balance"
                            value={balance}
                            onChange={this.handleInputChange}
                            required></Input>
                    </div>
                    <SubmitButton name="Save" />
                </form>
                {successMessage && (
                    <div className="mt-3 text-center text-sm font-medium p-2.5 text-green-800 bg-green-100 rounded-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
        )
    }
}