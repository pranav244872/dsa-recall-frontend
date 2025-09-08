import { useState } from 'react';
import { type SignupForm } from '../../types/user';
import styles from './SignUp.module.css';
// 1. Import the API function
import { signup } from '../../api/userApi';

const SignUp = () => {
  // State definitions are unchanged
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Call the real API function
      await signup(formData);
      // If it succeeds, set the success message
      setSuccess('Account created successfully! You can now log in.');
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (err: unknown) {
      // If it fails, catch the error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      // This block runs whether the try or catch block completed
      setLoading(false);
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

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

export default SignUp;
