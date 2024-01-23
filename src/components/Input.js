import React from 'react';

const Input = ({ type, name, value, onChange, placeholder }) => {
    return (
        <input
            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-grey-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default Input;
