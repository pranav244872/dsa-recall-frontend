import { useState } from 'react';
import { type LoginForm } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import Alert from '../../components/Alert/Alert'; // <-- Import Alert component

const Login = () => {
  const { user, loading, error, login } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(credentials);
  };

  // Redirect logic: If the user is successfully logged in,
  // we can simply show a welcome message or redirect them.
  // The ProtectedRoute will handle keeping them on the dashboard.
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

        {/* Use the Alert component for consistent styling */}
        {error && <Alert message={error} type="error" />}
      </form>
    </div>
  );
};

export default Login;
