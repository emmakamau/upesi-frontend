import React from 'react';

const Label = ({ name }) => {
    return (
        <label className="font-semibold text-blue-gray-400 transition-all">
            {name}
        </label>
    );
};

export default Label;
