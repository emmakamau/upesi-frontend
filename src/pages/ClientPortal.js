import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import TransferCash from "../components/TransferCash";
import WithdrawAtm from "../components/WithdrawAtm";
import Transactions from "../components/Transactions";

export class ClientPortal extends Component {

    userId = sessionStorage.getItem('userId');
    userName = sessionStorage.getItem('userName');
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto p-4">
                    <h3 className="text-lg mb-4 italic font-bold">Hello, {this.userName}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-white rounded shadow">
                            <TransferCash />
                        </div>
                        <div className="p-4 bg-white rounded shadow">
                            <WithdrawAtm />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <Transactions userId={this.userId} />
                    </div>
                </div>
            </div>
        )
    }
}