import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import TransferCash from "../components/TransferCash";
import WithdrawAtm from "../components/WithdrawAtm";
import { TransactionsTable } from "../components/TransactionsTable";

export class ClientPortal extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="main-content">
                    <TransferCash />
                    <WithdrawAtm />
                </div>
                <div className="p-4">
                    <TransactionsTable />
                </div>
            </div>
        )
    }
}