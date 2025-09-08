import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Dashboard</h1>
      <p className={styles.text}>
        This is your protected dashboard. Only logged-in users can see this!
      </p>
    </div>
  );
};

export default Dashboard;
