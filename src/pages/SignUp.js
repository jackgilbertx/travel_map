import React, { useState, useEffect } from 'react';
import {
  signUp,
  useAuth,
  logout,
  signIn,
  passwordResetEmail,
  db,
} from '../firebase/firesbase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();

  const style = {
    display: 'block',
    margin: '8px 0',
    padding: '12px',
  };

  const handleSignUp = async () => {
    // console.log(email, password);
    setLoading(true);
    try {
      console.log(await signUp(email, password));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const { user } = await signIn(email, password);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      console.log(await passwordResetEmail('jackgilbertx@gmail.com'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const queryDB = async () => {
    const querySnapshot = await getDocs(
      collection(db, 'users', 'user1', 'locations')
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
    // const querySnapshot = await getDoc(
    //   doc(db, 'users', 'user1', 'locations', 'location1')
    // );
    // console.log(querySnapshot.data().photos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Current logged in as {currentUser && currentUser.email}</h1>
      <h1>login</h1>
      <label htmlFor='email'>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        style={style}
        placeholder='johndoe.com'
        type='text'
        name='email'
        id='email'
      />
      <label htmlFor='password'>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        style={style}
        placeholder='123456'
        type='text'
        name='password'
        id='password'
      />
      <button disabled={loading || currentUser} onClick={handleSignUp}>
        Sign Up
      </button>
      <button disabled={loading || currentUser} onClick={handleLogIn}>
        Sign In
      </button>
      <button disabled={loading || !currentUser} onClick={handleLogOut}>
        Log out
      </button>
      <button onClick={handlePasswordReset}>Send password reset email</button>
      <button onClick={queryDB}>Query</button>
    </div>
  );
};

export default SignUp;
