import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
