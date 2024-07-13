import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

function ToggleLocale() {
    const { locale, toggleLocale } = useContext(LocaleContext);
    return (
        <button className="toggle-locale__button" onClick={toggleLocale}>{locale === 'id' ? 'ID' : 'EN' }</button>
    );
}


export default ToggleLocale;