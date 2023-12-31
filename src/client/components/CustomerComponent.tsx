import React, { useContext, useEffect } from 'react';
import { AppStateContext } from '../../app-state';

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
      {incidents.map((inc: any) => (
        <div key={inc.id}>
            <p >{inc.building_name}</p>
            <p >{inc.location_description}</p>
            <p >{inc.attending_staff}</p>
            <p >{inc.resolved}</p>
            <p >{inc.resolution}</p>
            <p >Find on What Three Words: <a href="#">{inc.whatthreewords}</a></p>
        </div>
        
      ))}
    </>
  );
}

export default CustomerDashboard;
