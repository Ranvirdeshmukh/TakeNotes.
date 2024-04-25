// Ranvir Deshmukh
//

import React, { useState, useEffect } from 'react';
import Note from './note';
import {
  getNotes, addNote as addNoteToFirebase, updateNoteInFirebase, deleteNoteFromFirebase,
} from './services/firebaseConfig';

function App() {
  const [notes, setNotes] = useState({});
  const [history, setHistory] = useState([]); // History stack for undo feature
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    getNotes(fetchedNotes => {
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

  const saveToHistory = notesState => {
    setHistory(prevHistory => [...prevHistory, notesState]);
  };

  const undo = () => {
    setHistory(prevHistory => {
      const newState = prevHistory.pop();
      if (newState) {
        setNotes(newState);
      }
      return prevHistory;
    });
  };

  const addNote = () => {
    saveToHistory({ ...notes });
    const id = Date.now().toString();
    const newNote = {
      id,
      title: newNoteTitle.trim() || 'New Note',
      text: 'Note content...',
      x: 100,
      y: 100,
      zIndex: 100,
    };
    addNoteToFirebase(newNote);
    setNotes(prevNotes => ({ ...prevNotes, [id]: newNote }));
    setNewNoteTitle('');
  };

  const updateNote = (id, updatedFields) => {
    saveToHistory({ ...notes });
    const updatedNote = { ...notes[id], ...updatedFields };
    updateNoteInFirebase(id, updatedNote);
    setNotes(prevNotes => ({ ...prevNotes, [id]: updatedNote }));
  };

  const deleteNote = idToDelete => {
    saveToHistory({ ...notes });
    deleteNoteFromFirebase(idToDelete);
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      delete updatedNotes[idToDelete];
      return updatedNotes;
    });
  };

  return (
    <div>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Enter note title..."
          value={newNoteTitle}
          onChange={e => setNewNoteTitle(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addNote()}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <button onClick={addNote}>Add Note</button>
        <button onClick={undo} disabled={history.length === 0}>Undo</button>
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
