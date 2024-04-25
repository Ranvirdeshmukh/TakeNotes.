import React, { useState } from 'react';
import firebase from './services/firebaseConfig'; // Ensure this path is correct

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (signInError) {
      setError(signInError.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (signUpError) {
      if (signUpError.code === 'auth/email-already-in-use') {
        setError('Email already exists. Please sign in instead.');
      } else {
        setError(signUpError.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p>{error}</p>}
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignIn;
