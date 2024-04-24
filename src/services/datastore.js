import firebase from './firebaseConfig'; // Adjust the path as necessary

const database = firebase.database();
// Function to get notes
export const getNotes = callback => {
  database.ref('notes').on('value', snapshot => {
    const notes = snapshot.val();
    callback(notes);
  });
};

// Function to add a new note
export const addNote = note => {
  const noteRef = database.ref('notes').push();
  noteRef.set(note);
};

// Function to update a note
export const updateNote = (id, note) => {
  database.ref(`notes/${id}`).update(note);
};

// Function to delete a note
export const deleteNote = id => {
  database.ref(`notes/${id}`).remove();
};
