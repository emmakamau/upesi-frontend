import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import TransferCash from "../components/TransferCash";
import WithdrawAtm from "../components/WithdrawAtm";

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
                </div>
            </div>
        )
    }
}