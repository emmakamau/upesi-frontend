import React, { Component } from "react";
import { NavTab } from "../components/NavTab";

import { AddATM } from "./ATM/AddAtm";
import ViewATM  from "./ATM/ViewATM";
import LoadATM  from "./ATM/LoadATM";

export class ATM extends Component {
    render() {
        return (
            <div>
                <div className="mt-4">
                    <NavTab
                        tabsData={[
                            { label: "Add New ATM", value: "new_atm", content: <AddATM /> },
                            { label: "View ATMS", value: "view_atms", content: <ViewATM /> },
                            { label: "Load ATM", value: "load_atm", content: <LoadATM /> }
                        ]} />
                </div>
            </div>
        )
    }
}