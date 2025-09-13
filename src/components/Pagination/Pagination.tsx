import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null; // Don't render if there's only one page
  }

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 1) return [1];

    pages.push(1);
    if (currentPage > 3) {
      pages.push('...');
    }
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.navButton}
      >
        &larr;
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.activePage : ''
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className={styles.ellipsis}>
              {page}
            </span>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.navButton}
      >
        &rarr;
      </button>
    </nav>
  );
};

export default Pagination;
