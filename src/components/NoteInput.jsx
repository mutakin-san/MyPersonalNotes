import React, { useState } from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import { useInput } from '../utils/customHooks';

function NoteInput({ addNote }) {

    const [title, setTitle] = useInput('');
    const [body, setBody] = useInput('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

  async function onSubmitEventHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    await addNote({title, body});
    setIsLoading(false);
    setTitle('');
    setBody('');
  }

  return (
    <div className='note-input'>
      <h2>{t('createNote')}</h2>
      <form onSubmit={onSubmitEventHandler}>
        <p className="note-input__title__char-limit">{t('charLimit')}: {50 - title.length}</p>
        <input required className='note-input__title' type="text" placeholder={t('titlePlaceholder')} value={title} onChange={(event) => setTitle(event.target.value)} />
        <textarea required className='note-input__body' placeholder={t('bodyPlaceholder')} value={body} onChange={(event) => setBody(event.target.value)} />
        <button disabled={isLoading} className='note-input__button' type="submit">{isLoading ? 'Loading...' : t('createNote')}</button>
      </form>
    </div>
  )
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
