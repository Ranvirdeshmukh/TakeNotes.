// Ranvir Deshmukh
//

import React, { useState, useEffect } from 'react';

import firebase, {
  getNotes, addNote as addNoteToFirebase, updateNoteInFirebase, deleteNoteFromFirebase,
} from './services/firebaseConfig';

import Note from './note';
import SignIn from './SignIn';

function App() {
  const [notes, setNotes] = useState({});
  const [user, setUser] = useState(null); // New state for user authentication
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [history, setHistory] = useState([]); // History stack for undo feature

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser); // Listen for user state changes

    if (user) {
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
    }
  }, [user]);

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
    if (!user) return;
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
    if (!user) return;
    saveToHistory({ ...notes });
    const updatedNote = { ...notes[id], ...updatedFields };
    updateNoteInFirebase(id, updatedNote);
    setNotes(prevNotes => ({ ...prevNotes, [id]: updatedNote }));
  };

  const deleteNote = idToDelete => {
    if (!user) return;
    saveToHistory({ ...notes });
    deleteNoteFromFirebase(idToDelete);
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      delete updatedNotes[idToDelete];
      return updatedNotes;
    });
  };

  const handleSignOut = () => {
    firebase.auth().signOut(); // Sign out function
  };

  return (
    <div>
      {!user ? (
        <SignIn />
      ) : (
        <>
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
            <button onClick={handleSignOut}>Sign Out</button>
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
        </>
      )}
    </div>
  );
}

export default App;
