import React, { useState, useEffect } from 'react';
import Note from './note';
import { getNotes, addNote as addNoteToFirebase } from './services/firebaseConfig';

function App() {
  const [notes, setNotes] = useState({});
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    getNotes(fetchedNotes => {
      console.log('Fetched notes:', fetchedNotes);
      if (fetchedNotes) {
        const newNotesState = fetchedNotes.reduce((acc, note) => {
          acc[note.id] = note;
          return acc;
        }, {});
        setNotes(newNotesState);
      } else {
        setNotes({});
      }
    });
  }, []);

  const addNote = () => {
    const id = Date.now().toString(); // Ensure it's a string if your keys are strings
    const newNote = {
      id,
      title: newNoteTitle.trim() || 'New Note',
      text: 'Note content...',
      x: 0,
      y: 0,
      zIndex: 100,
    };
    addNoteToFirebase(newNote);
    setNotes(prevNotes => ({
      ...prevNotes,
      [id]: newNote,
    }));
    setNewNoteTitle('');
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

  // Extra credit : added a feature of the where the new note is created when the user clicks in enter on his keyboard.
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addNote();
    }
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
          onKeyPress={handleKeyPress} // Add the key press listener
          style={{ marginRight: '10px', width: '300px', height: '100%' }}
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
