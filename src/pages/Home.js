import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css';

class Home extends Component {
    render() {
        return (
            <div className="flex flex-col items-center justify-center bg-gray-800 h-screen">
                <h1 className="max-w-3xl py-2 mx-auto text-6xl text-center text-gray-800 md:text-6xl dark:text-white">
                    WELCOME
                </h1><br />
                <p className="max-w-3xl italic py-2 mx-auto text-2xl text-center text-gray-800 md:text-2xl dark:text-white">
                    to
                </p> <br />
                <h1 className="home-link max-w-3xl py-2 mx-auto text-6xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    UPESI
                </h1><br /><br />

                <Link to="/login" class="inline-block text-white font-bold py-2 px-4 mt-4 rounded-full bg-gradient-to-r from-gray-900 via-gray-500 to-gray-100 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out">
                    Login to your Account
                </Link>
            </div>
        )
    }
}

export default Home;