import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

function Note({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [noteSize, setNoteSize] = useState({ width: 170, height: 170 });

  // Determine color class based on note id
  const noteColorClass = `note-color-${(parseInt(note.id, 10) % 6) + 1}`;

  const handleSave = () => {
    updateNote(note.id, { title, text, ...noteSize });
    setIsEditing(false);
  };

  const handleResize = (event, { size }) => setNoteSize(size);
  const handleDrag = (e, data) => updateNote(note.id, { x: data.x, y: data.y });

  const toggleExpandNote = () => setNoteSize(prevSize => (prevSize.width === 400 ? { width: 170, height: 170 } : { width: 400, height: 400 }));

  return (
    <Draggable
      handle=".note-header"
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleDrag}
    >
      <Resizable width={noteSize.width} height={noteSize.height} onResize={handleResize} minConstraints={[170, 170]}>
        <div className={`note ${noteColorClass}`} style={{ zIndex: note.zIndex, width: noteSize.width, height: noteSize.height }}>
          <div className="note-controls" style={{ position: 'absolute', top: 0, right: 0 }}>
            <button onClick={toggleExpandNote} aria-label="Expand or collapse note">
              <i className="fas fa-expand-arrows-alt" />
            </button>
            <button onClick={() => setIsEditing(true)} aria-label="Edit note">
              <i className="fas fa-pencil-alt" />
            </button>
            <button onClick={() => deleteNote(note.id)} aria-label="Delete note">
              <i className="fas fa-trash-alt" />
            </button>

          </div>
          {isEditing ? (
            <div className="edit-mode">
              <input value={title} onChange={e => setTitle(e.target.value)} />
              <textarea value={text} onChange={e => setText(e.target.value)} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="view-mode">
              <div className="note-header"><h1>{note.title}</h1></div>
              <p>{note.text}</p>
            </div>
          )}
        </div>
      </Resizable>
    </Draggable>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
