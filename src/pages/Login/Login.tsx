import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LoginForm } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';
import Alert from '../../components/Alert/Alert';

const Login = () => {
  // We no longer need the 'user' from useAuth here
  const { loading, error, login } = useAuth();
  const navigate = useNavigate();

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
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch {
      // Error is already handled by the auth hook, so we don't need to do anything here.
    }
  };

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

        {error && <Alert message={error} type="error" />}
      </form>
    </div>
  );
};

export default Login;
