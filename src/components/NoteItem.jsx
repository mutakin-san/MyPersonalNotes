import React from "react";
import NoteItemBody from "./NoteItemBody";
import PropTypes from "prop-types";


import { FiArchive, FiArrowUp, FiDelete } from "react-icons/fi";
function NoteItem({ id, title, body, archived, createdAt, onDelete, onArchived }) {

    return (
        <div className="note-item">
            <div className="note-item__content">
                <NoteItemBody id={id} title={title} body={body} createdAt={createdAt} archived={archived} />
            </div>
            <div className="note-item__action">
                <button className="note-item__archive-button" onClick={() => onArchived(id)}>{archived ? <FiArrowUp /> : <FiArchive />}</button>
                <button className="note-item__delete-button" onClick={() => onDelete(id)}><FiDelete /></button>
            </div>
        </div>
    );
}



NoteItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
}


export default NoteItem;