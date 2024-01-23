import React, { Component } from "react";
import 'tailwindcss/tailwind.css';

class Home extends Component {
    render() {
        return (
            <div className="relative z-20 flex items-center justify-center">
                <p className="my-6 text-3xl text-center dark:text-white">
                    WELCOME
                </p>
                <p className="my-6 text-3xl text-center dark:text-white">
                    TO
                </p>
                <h2 className="max-w-3xl py-2 mx-auto text-5xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    UPESI
                </h2>
            </div>
        )
    }
}

export default Home;