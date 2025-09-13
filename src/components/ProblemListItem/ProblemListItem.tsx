import { Link } from 'react-router-dom';
import { type Problem } from '../../types/problem';
import styles from './ProblemListItem.module.css';

type ProblemListItemProps = {
  problem: Problem;
  onReview?: (problemId: number, isEasy: boolean) => void;
};

const ProblemListItem = ({ problem, onReview }: ProblemListItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.details}>
        <h3 className={styles.title}>{problem.Title}</h3>
      </div>
      <div className={styles.actions}>
        {/* Conditionally render the review buttons ONLY if onReview is provided */}
        {onReview && (
          <>
            <button
              className={`${styles.actionButton} ${styles.hardButton}`}
              onClick={() => onReview(problem.ID, false)}
            >
              Hard
            </button>
            <button
              className={`${styles.actionButton} ${styles.easyButton}`}
              onClick={() => onReview(problem.ID, true)}
            >
              Easy
            </button>
          </>
        )}
        <Link to={`/problems/${problem.ID}`} className={styles.actionButton}>
          View Solution
        </Link>
        <a
          href={problem.Link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionButton}
        >
          Go to Problem
        </a>
      </div>
    </li>
  );
};

export default ProblemListItem;
