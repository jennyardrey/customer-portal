import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../app-state';
import { Link } from 'react-router-dom';

function CustomerDashboard() {
  const myContextValue = useContext(AppStateContext);

  // Perform a null check on myContextValue
  if (!myContextValue) {
    
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
  }
  const { user, incidents } = myContextValue;

  return (
    <>
      <ul>
        <li><Link to="/dashboard">Back to dashboard</Link></li>
        <li>Change password</li>
      </ul>
    </>
  );
}

export default CustomerDashboard;
