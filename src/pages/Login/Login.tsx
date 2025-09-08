import { useState } from 'react';
import { type LoginForm } from '../../types/user';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

const Login = () => {
  // Call custom hook to get shared state and functions
  const { user, loading, error, login } = useAuth();

  // Manage local state ONLY for the form inputs
  const [credentials, setCredentials] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit by calling the function from the hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(credentials);
  };

  if (user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome back, {user.name}!</h1>
        <p className={styles.success}>You are successfully logged in.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        {/* The error message comes from the useAuth hook */}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
