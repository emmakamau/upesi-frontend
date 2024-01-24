import React, { Component } from "react";
import { NavTab } from "../components/NavTab";

import ListSavingsAccount from "./Client/ListSavingsAccount";
import CreateSavingsAccount from "./Client/CreateSavingsAccount";

export class SavingsAccount extends Component {
    render() {
        return (
            <div>
                <div className="mt-4 max-w-screen bg-gray-100">
                    <NavTab
                        tabsData={[
                            { label: "Add New Savings Account", value: "new_savings_account", content: <CreateSavingsAccount /> },
                            { label: "View Savings Account", value: "view_savings_account", content: <ListSavingsAccount /> },
                        ]} />
                </div>
            </div>
        )
    }
}