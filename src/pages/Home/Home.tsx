import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to DSA Recall</h1>
      <p className={styles.subtitle}>
        Your personal spaced repetition tool for mastering data structures and
        algorithms.
      </p>
    </div>
  );
};

export default Home;
