import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NoteItem from "../components/NoteItem";
import { useNavigate, useParams } from "react-router-dom";

function DetailPage({ getNote, onDelete, onArchived }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchNote() {
            setIsLoading(true);
            const note = await getNote(id);
            setNote(note);
            setIsLoading(false);
        }
        fetchNote();
    }, [id, getNote]);

    function onDeleteHandler(id) {
        onDelete(id)
        navigate('/');
    }

    return (
        <div className="detail-page">
            {isLoading ? <p>Loading...</p> : <NoteItem key={note.id} {...note} onDelete={onDeleteHandler} onArchived={onArchived} />}
        </div>
    );
}

DetailPage.propTypes = {
    getNote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}

export default DetailPage;