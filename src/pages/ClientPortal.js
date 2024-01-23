import React, { Component } from "react";

import { Navbar } from "../components/Navbar";
import  TransferCash from "../components/TransferCash";

export class ClientPortal extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="main-content h-screen">
                    <TransferCash />
                </div>
            </div>
        )
    }
}