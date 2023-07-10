import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light p-3 border border-bottom ">
           <div className="container-fluid">
                <NavLink to="/" className="navbar-brand ">Calories tracker</NavLink>
           </div>
        </nav>
    );
};

export default Navbar;