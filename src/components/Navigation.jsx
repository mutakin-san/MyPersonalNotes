import React from "react";
import { FiHome, FiLogOut, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";

function Navigation({ logout, name }) {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/"><FiHome /></Link></li>
                <li><Link to="/notes/add"><FiPlusCircle /></Link></li>
                <li><ToggleTheme /></li>
                <li><ToggleLocale /></li>
                <li><button className="navigation__logout" onClick={logout}>{ name } <FiLogOut /></button></li>
            </ul>
        </nav>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Navigation;