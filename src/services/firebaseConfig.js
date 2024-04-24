import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB5fmXlIwCnnRLwnkMGOsLBbo37NH2nDMY',
  authDomain: 'note-app-d208b.firebaseapp.com',
  databaseURL: 'https://note-app-d208b-default-rtdb.firebaseio.com',
  projectId: 'note-app-d208b',
  storageBucket: 'note-app-d208b.appspot.com',
  messagingSenderId: '176103197030',
  appId: '1:176103197030:web:720674da5e10fc37c660a7',
  measurementId: 'G-HGY9S17NK7',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Export the Firebase app instance
export default app;
