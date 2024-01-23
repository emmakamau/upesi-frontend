import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Navbar extends Component {
    render() {
        return (
            <header>
                <div className="">
                    <header class="text-inherit body-font">
                        <div class="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
                            <NavLink to="/" exact class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                                <h1 className="home-link">Upesi</h1>
                            </NavLink>
                            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                                <NavLink to="/" class="mx-2 px-2 hover:text-white-900" className="link">Home</NavLink>
                                <NavLink to="/register/client" class="mx-2 px-2 hover:text-white-900" className="link">Client Registration</NavLink>
                                <NavLink to="/register/accountmanager" class="mx-2 px-2 hover:text-white-900" className="link">Staff Registration</NavLink>
                            </nav>
                        </div>
                    </header>
                </div>
            </header>
        )
    }
}