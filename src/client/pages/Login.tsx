import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AppStateContext} from '../../app-state'
import styles from "../styles/Login.module.css"


const Login = () => {
  const myContextValue = useContext(AppStateContext);

   // Perform a null check on myContextValue
   if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
  }
  const {
    user, 
    setUser,
    setInputtedUsername,
    inputtedUsername
  } = myContextValue;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


 

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/login/', {
        username: inputtedUsername,
        password: password
      });
  
      const data = response.data;
      console.log(data);
  
      if (response.status === 200) {
        console.log(data.user)
        const userJson = JSON.stringify(data.user)
        localStorage.setItem('loggedInUser', userJson);
        console.log(userJson)
        setUser(data.user)

        alert('Login successful.');
        navigate('/dashboard'); // Change the URL to the desired page
        return true;
      } else {
        alert('Login failed.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
      return false;
    }
  }
  const handleInputUsername = (e: ChangeEvent<HTMLInputElement> ) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setInputtedUsername(value);
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setPassword(value);
  };

/*   const handleSubmit = (e) => {
    e.preventDefault();
    
      
    // Here you would submit the login credentials to the server
    // and handle the response appropriately
    if (username === 'admin' && password === 'admin') {
      alert('You have successfully logged in!');
    } else {
      setError('Invalid username or password.');
    }
  }; */

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      {error && <p className={styles.error}>{error}</p>}
      <label>
        Username:
        <input className={styles.input}
          type="text"
          value={inputtedUsername}
          onChange={handleInputUsername}
        />
      </label>
      <label>
        Password:
        <input className={styles.input}
          type="password"
          value={password}
          onChange={handleInputPassword}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
