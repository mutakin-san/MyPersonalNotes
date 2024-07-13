import React from "react";
import NoteList from "./NoteList";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function NoteBody({ notes, archivedNotes, onDelete, onArchived, onUnarchived }) {
    const { t } = useTranslation();

    return (
        <div className="note-app__body">
            <h2>{t('activeNotes')}</h2>
            {!notes.length ? <p className="notes-list__empty-message">{t('noActiveNotes')}</p> : <NoteList notes={notes} onDelete={onDelete} onArchived={onArchived} onUnarchived={onUnarchived} />}
            <h2>{t('archivedNotes')}</h2>
            {!archivedNotes.length ? <p className="notes-list__empty-message">{t('noArchivedNotes')}</p> : <NoteList notes={archivedNotes} onDelete={onDelete} onArchived={onArchived} onUnarchived={onUnarchived} />}
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