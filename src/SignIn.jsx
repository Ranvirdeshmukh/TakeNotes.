import React, { useState } from 'react';
import firebase from './services/firebaseConfig';

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

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setError('Password reset email sent.');
    } catch (forgotPasswordError) {
      setError(forgotPasswordError.message);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="logo-container">
        {/* Assuming you have a logo.png in your public folder */}
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="form-container">
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
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleForgotPassword}>Forgot Password</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
