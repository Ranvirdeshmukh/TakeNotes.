import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

function Note({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  // Define default and minimum sizes for the note
  const defaultSize = { width: 170, height: 170 };
  const minSize = { width: 170, height: 170 }; // Minimum size
  const [noteSize, setNoteSize] = useState(defaultSize);

  const handleSave = () => {
    updateNote(note.id, { title, text, ...noteSize });
    setIsEditing(false);
  };

  const handleResize = (event, { size }) => {
    setNoteSize(size);
  };

  const handleDrag = (e, data) => {
    updateNote(note.id, { x: data.x, y: data.y });
  };

  const expandNote = () => {
    if (noteSize.width === 400 && noteSize.height === 400) {
      setNoteSize(defaultSize);
    } else {
      setNoteSize({ width: 400, height: 400 });
    }
  };

  return (
    <Draggable
      axis="both"
      handle=".note-header"
      defaultPosition={{ x: note.x, y: note.y }}
      position={null}
      onDrag={handleDrag}
    >
      <Resizable
        width={noteSize.width}
        height={noteSize.height}
        onResize={handleResize}
        minConstraints={[minSize.width, minSize.height]}
        maxConstraints={[800, 600]} // Optionally set max size constraints
      >
        <div className="note" style={{ zIndex: note.zIndex, width: noteSize.width, height: noteSize.height }}>
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
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
              <button onClick={expandNote} aria-label="Expand Note"><i className="fas fa-expand-arrows-alt" /></button>
            </div>
          )}
        </div>
      </Resizable>
    </Draggable>
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
