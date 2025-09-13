import { useAuth } from '../../contexts/AuthContext';
import styles from './StreakCard.module.css';

const motivationalMessages = [
  'Keep the fire burning!',
  'Consistency is key.',
  'One day at a time.',
  "You're on a roll!",
  'Making progress every day.',
];

const StreakCard = () => {
  const { user } = useAuth();
  const streak = user?.currentStreak || 0;

  // Get a consistent message for the day
  const messageIndex = new Date().getDate() % motivationalMessages.length;
  const message = motivationalMessages[messageIndex];

  return (
    <div className={styles.card}>
      <div className={styles.leftContent}>
        <div className={styles.streakInfo}>
          <span className={styles.count}>{streak}</span>
          <span className={styles.label}>Day Streak</span>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.icon}>🔥</div>
    </div>
  );
};

export default StreakCard;
