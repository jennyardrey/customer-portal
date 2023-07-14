import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../app-state';
import StaffDashboard from '../components/StaffComponent';
import CustomerDashboard from '../components/CustomerComponent';
import axios from 'axios';

const Dashboard = () => {
    const contextValue = useContext(AppStateContext);

    // Perform a null check on the contextValue
    if (!contextValue) {
      // Handle the case when the context value is undefined
      return null; // or display a loading indicator, error message, etc.
    }
  
    const {setUser,  user,  setIncidents, loading, setLoading } = contextValue;

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        console.log(loggedInUser)
        /* const foundUser = loggedInUser;
        setUser(foundUser); */
      }
    }, []);

    useEffect(() => {
      console.log(user.id)
      getIncidents()
    }, [])

    const getIncidents = async () => {
      setLoading(true)
      try {
        const incidents = await axios.get(`http://localhost:3001/api/users/${user.id}/incidents`)
        
          
        setIncidents(incidents.data)
       setLoading(false)
      } catch (error) {
        console.error('error: ', error)
        setLoading(false)
      }
    }

    if (loading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          {user.role === 'staff' ? (
            <StaffDashboard />
          ) : user.role === 'customer' ? (
            <CustomerDashboard />
          ) : (
            null
          )}
        </div>
      );
    }

  
};

export default Dashboard;
