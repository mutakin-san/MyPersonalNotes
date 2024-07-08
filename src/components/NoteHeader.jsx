import React from "react";
import NoteSearch from "./NoteSearch";
import Navigation from "./Navigation";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function NoteHeader({ searchQuery, onQueryChange }) {

    return (
        <div className="note-app__header">
            <h1>Notes</h1>
            <Navigation />
            <NoteSearch query={searchQuery} onSearchHandler={onQueryChange} />
        </div>
    )
}


NoteHeader.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired,
}

export default NoteHeader;