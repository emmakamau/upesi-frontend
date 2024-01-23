import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import { NavTab } from "../components/NavTab";
import Transactions from "../components/Transactions";

import { ATM } from "../components/ATM";

export class StaffPortal extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="mt-4">
                    <NavTab
                        tabsData={[
                            { label: "ATMs", value: "atms", content: <ATM />},
                            { label: "Client Accounts", value: "client_accounts", content: <></>},
                            { label: "Transactions", value: "transactions", content: <Transactions />}
                        ]} />
                </div>
            </div>
        )
    }
}