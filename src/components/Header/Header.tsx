import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>DSA Recall</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Dashboard
            </NavLink>
            <button className={styles.link} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
