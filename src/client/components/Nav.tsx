import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AppStateContext } from '../../app-state';
import styles from "../styles/Nav.module.css"


function Nav() {
  const contextValue = useContext(AppStateContext);

  // Perform a null check on the contextValue
  if (!contextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
  }

  const { handleLogout } = contextValue;

  const navigate = useNavigate();




  return (
    <nav className={styles.container}>
      <div >
        <img className={styles.logo} src={require('../assets/lock.svg').default} alt="Logo" />
      </div>
      <ul className={styles.navList}>
        <li>
          <Link to="/settings">Settings</Link>
          <button onClick={() => handleLogout(navigate)}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
