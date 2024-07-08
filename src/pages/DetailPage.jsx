import React from "react";
import PropTypes from "prop-types";
import NoteItem from "../components/NoteItem";
import { useNavigate, useParams } from "react-router-dom";

function DetailPage({ getNote, onDelete, onArchived }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const note = getNote(Number(id));

    function onDeleteHandler(id) {
        onDelete(Number(id))
        navigate('/');
    }
    return (
        <div className="detail-page">
            <NoteItem key={note.id} {...note} onDelete={onDeleteHandler} onArchived={onArchived} />
        </div>
    );
}

DetailPage.propTypes = {
    getNote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default DetailPage;