import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../app-state';
import StaffDashboard from '../components/StaffComponent';
import CustomerDashboard from '../components/CustomerComponent';
import axios from 'axios';
import Nav from '../components/Nav';

const Dashboard = () => {
    const contextValue = useContext(AppStateContext);

    // Perform a null check on the contextValue
    if (!contextValue) {
      // Handle the case when the context value is undefined
      return null; // or display a loading indicator, error message, etc.
    }
  
    const {setUser,  user,  setIncidents, loading, setLoading } = contextValue;

    useEffect(() => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      const loggedInUserObj = JSON.parse(loggedInUser)
      if (loggedInUserObj) {
        console.log(loggedInUserObj)
        const foundUser = loggedInUserObj;
        setUser(foundUser);
      }
    }, []);

    useEffect(() => {
      console.log(user.id)
      getIncidents()
    }, [user])

    const getIncidents = async () => {
      setLoading(true)
      try {
        const incidents = await axios.get(`http://localhost:3001/api/users/${user.id}/incidents`)
        
          const jsonIncidents = JSON.stringify(incidents)
          localStorage.setItem('storedIncidents', jsonIncidents)
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
          <Nav />
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
