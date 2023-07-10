import React from 'react';
import './ButtonSpinner.css';

const ButtonSpinner = () => {
    return (
        <>
            <div className="buttonload">
                <i className="fa fa-refresh fa-spin"></i>Loading
            </div>
        </>
    );
};

export default ButtonSpinner;