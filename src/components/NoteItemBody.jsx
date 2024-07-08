import React from 'react';
import { showFormattedDate } from '../utils';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

function NoteItemBody({ id, title, body, archived, createdAt }) {

  return (
    <div className="note-item__body">
      <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
      <p className="note-item__date">{showFormattedDate(createdAt)} {archived && ' - Archived'}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}


NoteItemBody.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
}


export default NoteItemBody;