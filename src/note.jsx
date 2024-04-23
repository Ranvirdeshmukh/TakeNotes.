// Note.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // This line imports PropTypes

function Note({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleSave = () => {
    updateNote(note.id, { title, text });
    setIsEditing(false);
  };

  return (
    <div className="note" style={{ left: `${note.x}px`, top: `${note.y}px`, zIndex: note.zIndex }}>
      {isEditing ? (
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={text} onChange={e => setText(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{note.title}</h1>
          <p>{note.text}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
  }).isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Note;
