import { type Problem } from '../../types/problem';
import ProblemListItem from '../ProblemListItem/ProblemListItem';
import styles from './ProblemList.module.css';

type ProblemListProps = {
  problems: Problem[];
  // Add the optional onReview prop here
  onReview?: (problemId: number, isEasy: boolean) => void;
};

const ProblemList = ({ problems, onReview }: ProblemListProps) => {
  return (
    <ul className={styles.list}>
      {problems.map((problem) => (
        <ProblemListItem
          key={problem.ID}
          problem={problem}
          onReview={onReview} // Pass the prop down
        />
      ))}
    </ul>
  );
};

export default ProblemList;
