import React from "react";
import PropTypes from "prop-types";

function NoteSearch({ query, onSearchHandler }) {
    return (
        <div className="note-search">
            <input type="text" placeholder="Cari Catatan..." value={query} onChange={(event) => onSearchHandler(event.target.value)} />
        </div>
    );
}


NoteSearch.propTypes = {
    query: PropTypes.string.isRequired,
    onSearchHandler: PropTypes.func.isRequired,
}

export default NoteSearch;