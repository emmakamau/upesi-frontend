import React from 'react';

const SubmitButton = ({ name }) => {
    return (
        <button
            type="submit"
            className="mt-10 block w-full select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            {name}
        </button>
    );
};

export default SubmitButton;
