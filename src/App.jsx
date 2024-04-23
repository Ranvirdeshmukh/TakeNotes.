// App.jsx
import React, { useState } from 'react';
import Note from './note';

function App() {
  const [notes, setNotes] = useState({});

  const addNote = note => {
    const id = Date.now(); // A simple way to get a unique id
    setNotes(prevNotes => ({
      ...prevNotes,
      [id]: { ...note, id },
    }));
  };

  const deleteNote = id => {
    setNotes(prevNotes => {
      const newNotes = { ...prevNotes };
      delete newNotes[id];
      return newNotes;
    });
  };

  const updateNote = (id, updatedFields) => {
    setNotes(prevNotes => ({
      ...prevNotes,
      [id]: { ...prevNotes[id], ...updatedFields },
    }));
  };

  return (
    <div>
      {/* Placeholder for adding a note, for demonstration purposes */}
      <button onClick={() => addNote({
        title: 'New Note', text: 'Type here...', x: 100, y: 100, zIndex: 1,
      })}
      >
        Add Note
      </button>
      <div className="notes-container">
        {Object.entries(notes).map(([id, note]) => (
          <Note key={id} note={note} deleteNote={deleteNote} updateNote={updateNote} />
        ))}
      </div>
    </div>
  );
}

export default App;
