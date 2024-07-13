import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";

function ToggleTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button className="toggle-theme__button" onClick={toggleTheme}>{theme === 'light' ?<FaMoon /> : <FaSun />}</button>
    );
}


export default ToggleTheme;