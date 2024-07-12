import React, { useState } from "react";
import NoteItemBody from "./NoteItemBody";
import PropTypes from "prop-types";

import { FiArchive, FiArrowUp, FiDelete } from "react-icons/fi";
function NoteItem({
  id,
  title,
  body,
  archived,
  createdAt,
  onDelete,
  onArchived,
  onUnarchived,
}) {

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isArchivedLoading, setIsArchivedLoading] = useState(false);

  async function onDeleteHandler(id) {
    setIsLoadingDelete(true);
    await onDelete(id);
    setIsLoadingDelete(false);
  }

  async function onArchivedHandler(id) {
    setIsArchivedLoading(true);
    if(!archived) {
      await onArchived(id);
    } else {
      await onUnarchived(id);
    }
    setIsArchivedLoading(false);
  }

  return (
    <div className="note-item">
      <div className="note-item__content">
        <NoteItemBody
          id={id}
          title={title}
          body={body}
          createdAt={createdAt}
          archived={archived}
        />
      </div>
      <div className="note-item__action">
        <button
          className="note-item__archive-button"
          onClick={() => onArchivedHandler(id)}
        >
          {isArchivedLoading ? 'Loading...' : archived ? <FiArrowUp /> : <FiArchive />}
        </button>
        <button
          className="note-item__delete-button"
          onClick={() => onDeleteHandler(id)}
        >
          {isLoadingDelete ? 'Loading...' : <FiDelete />}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  onUnarchived: PropTypes.func.isRequired,
};

export default NoteItem;
