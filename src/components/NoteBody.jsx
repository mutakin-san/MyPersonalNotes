import React from "react";
import NoteList from "./NoteList";
import PropTypes from "prop-types";

function NoteBody({ notes, archivedNotes, onDelete, onArchived, onUnarchived }) {
    return (
        <div className="note-app__body">
            <h2>Catatan Aktif</h2>
            {!notes.length ? <p className="notes-list__empty-message">Tidak ada catatan</p> : <NoteList notes={notes} onDelete={onDelete} onArchived={onArchived} onUnarchived={onUnarchived} />}
            <h2>Arsip</h2>
            {!archivedNotes.length ? <p className="notes-list__empty-message">Tidak ada Arsip</p> : <NoteList notes={archivedNotes} onDelete={onDelete} onArchived={onArchived} onUnarchived={onUnarchived} />}
        </div>
    );
}


NoteBody.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    archivedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
    onUnarchived: PropTypes.func.isRequired,
}

export default NoteBody;