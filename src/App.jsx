import React, { useState, useEffect } from 'react';
import Note from './note';
import { getNotes } from './services/datastore';

function App() {
  const [notes, setNotes] = useState({});
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    getNotes(fetchedNotes => {
      console.log('Fetched notes:', fetchedNotes); // Check what you receive exactly
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      } else {
        setNotes({});
      }
    });
  }, []);

  const addNote = () => {
    const id = Date.now();
    const newNote = {
      id,
      title: newNoteTitle || 'New Note', // Use the input title or default to 'New Note'
      text: 'Note content...',
      x: 0, // Default position
      y: 0, // Default position
      zIndex: 100, // Starting zIndex, adjust as needed
    };
    setNotes(prevNotes => ({
      ...prevNotes,
      [id]: newNote,
    }));
    setNewNoteTitle(''); // Clear the input field after adding a note
  };

  const deleteNote = idToDelete => {
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      delete updatedNotes[idToDelete];
      return updatedNotes;
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
      <div
        className="toolbar"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Enter note title..."
          value={newNoteTitle}
          onChange={e => setNewNoteTitle(e.target.value)}
          style={{ marginRight: '10px', width: '300px', height: '100%' }} // Match the height of the toolbar
        />
        <button style={{ height: '100%' }} onClick={addNote}>Add Note</button>
      </div>
      <div className="notes-container">
        {Object.entries(notes).map(([id, note]) => (
          <Note
            key={id}
            note={note}
            deleteNote={() => deleteNote(id)}
            updateNote={updateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
