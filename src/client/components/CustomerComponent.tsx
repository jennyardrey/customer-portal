import React, { useContext } from 'react';
import { AppStateContext } from '../app-state';

function CustomerDashboard() {
  const contextValue = useContext(AppStateContext);

  // Perform a null check on the contextValue
  if (!contextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
  }

  const { incidents } = contextValue;

  return (
    <>
      {incidents.map((inc: any) => (
        <div>
            <p key={inc.id}>{inc.building_name}</p>
            <p key={inc.id}>{inc.location_description}</p>
            <p key={inc.id}>{inc.attending_staff}</p>
            <p key={inc.id}>{inc.resolved}</p>
            <p key={inc.id}>{inc.resolution}</p>
            <p key={inc.id}>Find on What Three Words: <a href="#">{inc.whatthreewords}</a></p>
        </div>
        
      ))}
    </>
  );
}

export default CustomerDashboard;
