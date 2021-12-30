import React, { useState } from 'react';
import { signUp } from '../firebase/firesbase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log(await signUp(email, password));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h1>login</h1>
      <label htmlFor='email'></label>
      <input placeholder='johndoe.com' type='text' name='email' id='email' />
      <label htmlFor='password'></label>
      <input placeholder='123456' type='text' name='password' id='password' />
      <button type='submit'>Sign Up</button>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default Login;
