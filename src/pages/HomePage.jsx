import React from "react";
import NoteBody from "../components/NoteBody";
import PropTypes from "prop-types";


function HomePage({ notes, onDelete, onArchived }) {
    return (
        <NoteBody notes={notes} onDelete={onDelete} onArchived={onArchived} />
    );
}

HomePage.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default HomePage;