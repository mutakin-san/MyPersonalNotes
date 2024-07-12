import React from "react";
import NoteSearch from "./NoteSearch";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

function NoteHeader({ searchQuery, onQueryChange, logout, name }) {

    return (
        <div className="note-app__header">
            <h1>Notes</h1>
            <Navigation logout={logout} name={name} />
            <NoteSearch query={searchQuery} onSearchHandler={onQueryChange} />
        </div>
    )
}


NoteHeader.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default NoteHeader;