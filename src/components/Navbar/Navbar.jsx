import React from "react";
import {NavLink} from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    return (
        <>
            <NavLink exact activeClassName="active_class" to="/">Home</NavLink>
            <NavLink exact activeClassName="active_class" to="/HelmetReport">HelmetReports</NavLink>
        </>
    );

}

export default Navbar;