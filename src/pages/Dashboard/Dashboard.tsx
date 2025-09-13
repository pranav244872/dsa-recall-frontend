import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  getDueProblems,
  getProblems,
  reviewProblem,
} from '../../api/problemApi';
import { type Problem, type PaginationMeta } from '../../types/problem';
import ProblemList from '../../components/ProblemList/ProblemList';
import Pagination from '../../components/Pagination/Pagination';
import StreakCard from '../../components/StreakCard/StreakCard';
import ActivityHeatmap from '../../components/ActivityHeatmap/ActivityHeatmap';
import styles from './Dashboard.module.css';

type Tab = 'due' | 'all';

const Dashboard = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('due');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        activeTab === 'due'
          ? await getDueProblems(currentPage)
          : await getProblems(searchTerm, currentPage);
      setProblems(response.problems);
      setMeta(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentPage, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm(''); // Clear search on tab change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleReview = async (problemId: number, isEasy: boolean) => {
    try {
      await reviewProblem(problemId, isEasy);
      fetchData(); // Refetch to update list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to review problem');
    }
  };

  const renderContent = () => {
    if (loading) return <p className={styles.text}>Loading problems...</p>;
    if (error) return <p className={styles.errorText}>Error: {error}</p>;
    return (
      <>
        {problems.length > 0 ? (
          <ProblemList
            problems={problems}
            onReview={activeTab === 'due' ? handleReview : undefined}
          />
        ) : (
          <p className={styles.text}>
            {activeTab === 'due'
              ? 'No problems due today!'
              : 'No problems found.'}
          </p>
        )}
        {meta && (
          <Pagination
            currentPage={meta.current_page}
            totalPages={meta.total_pages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </>
    );
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.leftColumn}>
        <StreakCard />
        <ActivityHeatmap />
      </aside>

      <div className={styles.rightColumn}>
        <main className={styles.mainColumn}>
          <div className={styles.controls}>
            <div className={styles.tabs}>
              <button
                className={activeTab === 'due' ? styles.activeTab : ''}
                onClick={() => handleTabChange('due')}
              >
                Due for Review
              </button>
              <button
                className={activeTab === 'all' ? styles.activeTab : ''}
                onClick={() => handleTabChange('all')}
              >
                All Problems
              </button>
            </div>
            <Link to="/problems/new" className={styles.newButton}>
              New Problem
            </Link>
          </div>

          {activeTab === 'all' && (
            <div className={styles.searchContainer}>
              <input
                type="search"
                placeholder="Search problems by title..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
          )}

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
