import React, { useContext, useEffect } from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AppStateContext } from '../app-state';
import Settings from './components/Settings';

function App() {

  const myContextValue = useContext(AppStateContext);

  // Perform a null check on myContextValue
  if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
  }

  const { user, setUser } = myContextValue;

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInUserObj = JSON.parse(loggedInUser)

    if (loggedInUserObj && loggedInUserObj.token) {
      setUser(loggedInUserObj);
    }
  }, []);

  console.log('user: ', user);


  
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;