import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function NoteSearch({ query, onSearchHandler }) {
    const { t }  = useTranslation();
    return (
        <div className="note-search">
            <input type="text" placeholder={t('searchPlaceholder')} value={query} onChange={(event) => onSearchHandler(event.target.value)} />
        </div>
    );
}


NoteSearch.propTypes = {
    query: PropTypes.string.isRequired,
    onSearchHandler: PropTypes.func.isRequired,
}

export default NoteSearch;