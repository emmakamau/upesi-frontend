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
                <div className="container mx-auto p-4 bg-gray-200">
                    <h3 className="text-lg mb-4 italic font-bold">Hello, {this.userName}</h3>
                    <div className="flex mt-4 justify-center">
                        <NavTab
                            tabsData={[
                                { label: "ATMs", value: "atms", content: <ATM /> },
                                { label: "Client Accounts", value: "client_accounts", content: <SavingsAccount /> },
                                { label: "Transactions", value: "transactions", content: <Transactions /> }
                            ]} />
                    </div>
                </div>
            </div>

        )
    }
}