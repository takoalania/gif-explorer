import styles from './Pagination.module.css';

interface Props {
  page: number;
  limit: number;
  count: number; 
  onPageChange: (n: number) => void;
}

export function Pagination({ page, limit, count, onPageChange }: Props) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.btn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      <span className={styles.pageIndicator}>Page {page}</span>

      <button
        className={styles.btn}
        onClick={() => onPageChange(page + 1)}
        disabled={count < limit}
      >
        Next
      </button>
    </nav>
  );
}
