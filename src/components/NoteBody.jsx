import React from "react";
import NoteList from "./NoteList";
import PropTypes from "prop-types";

function NoteBody({ notes, onDelete, onArchived }) {
    const activeNotes = notes.filter((note) => note.archived === false);
    const archivedNotes = notes.filter((note) => note.archived === true);
    return (
        <div className="note-app__body">
            <h2>Catatan Aktif</h2>
            {!activeNotes.length ? <p className="notes-list__empty-message">Tidak ada catatan</p> : <NoteList notes={activeNotes} onDelete={onDelete} onArchived={onArchived} />}
            <h2>Arsip</h2>
            {!archivedNotes.length ? <p className="notes-list__empty-message">Tidak ada Arsip</p> : <NoteList notes={archivedNotes} onDelete={onDelete} onArchived={onArchived} />}
        </div>
    );
}


NoteBody.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default NoteBody;