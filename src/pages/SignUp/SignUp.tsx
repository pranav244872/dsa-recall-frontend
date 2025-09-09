import { useState } from 'react';
import { type SignupForm } from '../../types/user';
import styles from './SignUp.module.css';
import Alert from '../../components/Alert/Alert';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
  });

  const { signup, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch {
      // error is already handled by the hook
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Your Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && <Alert message={error} type="error" />}
      </form>
    </div>
  );
};

export default SignUp;
