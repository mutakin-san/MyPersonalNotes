import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, onDelete, onArchived }) {
    return (
        <div className="notes-list">
            {notes.map((note) => <NoteItem key={note.id} {...note} onDelete={onDelete} onArchived={onArchived} />)}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default NoteList;