import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import { NavTab } from "../components/NavTab";
import Transactions from "../components/Transactions";

import { ATM } from "../components/ATM";
import { SavingsAccount } from "../components/SavingsAccounts";

export class StaffPortal extends Component {
    userName = sessionStorage.getItem('userName');
    render() {
        return (
            <div>
                <Navbar />
                <div className="mt-4">
                    <div>
                        <h3>Logged In: {this.userName}</h3>
                    </div>
                    <NavTab
                        tabsData={[
                            { label: "ATMs", value: "atms", content: <ATM />},
                            { label: "Client Accounts", value: "client_accounts", content: <SavingsAccount />},
                            { label: "Transactions", value: "transactions", content: <Transactions />}
                        ]} />
                </div>
            </div>
        )
    }
}