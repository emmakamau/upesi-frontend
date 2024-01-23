import React, { Component } from 'react';
import axios from 'axios';
import API_ENDPOINT from './appConfig';

import 'tailwindcss/tailwind.css';

export default class RegisterClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            response: null,
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, password } = this.state;
            const requestBody = {
                email: email,
                password: password,
            };

            // Replace 'your_api_endpoint_here' with your actual API endpoint
            const response = await axios.post(
                `${API_ENDPOINT}/api/User/RegisterNewClient`,
                requestBody
            );

            // Handle the response here
            this.setState({ response: response.data });
        } catch (error) {
            // Handle any errors here
            console.error(error);
        }
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    render() {
        const { email, password, response } = this.state;

        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        Sign Up Client Account
                    </h4>
                    <form onSubmit={this.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={this.handleEmailChange}
                                />
                                <label className="font-normal text-blue-gray-400 transition-all">
                                    Email
                                </label>
                            </div>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    type="password"
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handlePasswordChange}
                                />
                                <label className="font-normal text-blue-gray-400 transition-all">
                                    Password
                                </label>
                            </div>
                        </div>
                        <button
                            className="mt-10 block w-full select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="submit"
                            data-ripple-light="true"
                        >
                            Register
                        </button>
                    </form>

                    {response && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Response:</h3>
                            <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    )}
                </div>

                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
                />
                <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
            </div>

            // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            //         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            //             Sign Up Client Account
            //         </h2>
            //     </div>

            //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            //         <form onSubmit={this.handleSubmit} className="space-y-6" action="#" method="POST">
            //             <div>
            //                 <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            //                     Email address
            //                 </label>
            //                 <div className="mt-2">
            //                     <input
            //                         id="email"
            //                         name="email"
            //                         type="email"
            //                         autoComplete="email"
            //                         required
            //                         value={email}
            //                         onChange={this.handleEmailChange}
            //                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            //                     />
            //                 </div>
            //             </div>

            //             <div>
            //                 <div className="flex items-center justify-between">
            //                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            //                         Password
            //                     </label>
            //                 </div>
            //                 <div className="mt-2">
            //                     <input
            //                         id="password"
            //                         name="password"
            //                         type="password"
            //                         autoComplete="current-password"
            //                         required
            //                         value={password}
            //                         onChange={this.handlePasswordChange}
            //                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            //                     />
            //                 </div>
            //             </div>

            //             <div>
            //                 <button
            //                     type="submit"
            //                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            //                 >
            //                     Sign Up
            //                 </button>
            //             </div>
            //         </form>

            //         {response && (
            //             <div className="mt-4">
            //                 <h3 className="text-xl font-semibold">Response:</h3>
            //                 <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
            //             </div>
            //         )}
            //     </div>
            // </div>
        );
    }
}

