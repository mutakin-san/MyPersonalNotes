import React from "react";
import NoteBody from "../components/NoteBody";
import PropTypes from "prop-types";


function HomePage({ notes, archivedNotes, onDelete, onArchived, onUnarchived }) {
    return (
        <NoteBody notes={notes} archivedNotes={archivedNotes} onDelete={onDelete} onArchived={onArchived} onUnarchived={onUnarchived} />
    );
}

HomePage.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    archivedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
    onUnarchived: PropTypes.func.isRequired,
}

export default HomePage;