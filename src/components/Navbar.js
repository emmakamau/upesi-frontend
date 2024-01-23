import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Navbar extends Component {
    render() {
        const userRole = sessionStorage.getItem('role');

        return (
            <header>
                <div className="">
                    <header className="text-inherit body-font">
                        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
                            <NavLink to="/" exact className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                                <h1 className="home-link">Upesi</h1>
                            </NavLink>
                            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                                <NavLink to="/" className="mx-2 px-2 hover:text-white-900 link">Home</NavLink>


                                {/* Links for Client */}
                                {userRole === "Client" && (
                                    <>
                                        <NavLink to="/clientportal" className="mx-2 px-2 hover:text-white-900 link">Client Portal</NavLink>
                                    </>
                                )}

                                {/* Links for Staff */}
                                {userRole === "Staff" && (
                                    <>
                                        <NavLink to="/register/client" className="link mx-2 px-2 hover:text-white-900">Client Registration</NavLink>
                                        <NavLink to="/register/accountmanager" className="mx-2 px-2 hover:text-white-900 link">Staff Registration</NavLink>
                                        <NavLink to="/register/client" className="mx-2 px-2 hover:text-white-900 link">Client Registration</NavLink>
                                    </>
                                )}
                            </nav>
                        </div>
                    </header>
                </div>
            </header>
        )
    }
}