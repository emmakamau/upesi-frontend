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
        return (
            <div className="flex min-h-screen mt-4 justify-center">
                <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                    <form onSubmit={this.handleSubmit}>
                        <div className='p-1'>
                            <Label name="Location" />
                            <Input
                                type="text"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleInputChange}></Input>
                        </div>
                        <div className='p-1'>
                            <Label name="Amount" />
                            <Input
                                type="number"
                                name="balance"
                                value={this.state.balance}
                                onChange={this.handleInputChange}
                                required></Input>
                        </div>
                        <SubmitButton name="Save" />
                    </form>
                    {this.state.successMessage && (
                        <div className="mt-3 text-center">
                            {this.state.successMessage}
                        </div>
                    )}
                </div>

            </div>
        )
    }
}