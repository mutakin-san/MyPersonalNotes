import React, { useState } from 'react';
import PropTypes from "prop-types";

function NoteInput({ addNote }) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
      <h2>Buat catatan</h2>
      <form onSubmit={onSubmitEventHandler}>
        <p className="note-input__title__char-limit">Sisa karakter: {50 - title.length}</p>
        <input required className='note-input__title' type="text" placeholder="Ini adalah judul..." value={title} onChange={(event) => setTitle(event.target.value)} />
        <textarea required className='note-input__body' placeholder="Tuliskan catatanmu di sini ... " value={body} onChange={(event) => setBody(event.target.value)} />
        <button disabled={isLoading} type="submit">{isLoading ? 'Loading...' : 'Buat'}</button>
      </form>
    </div>
  )
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
