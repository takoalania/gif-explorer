import { type FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch: (e: FormEvent) => void;
}

export function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <form className={styles.form} onSubmit={onSearch}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search GIFs…"
      />
      <button className={styles.button} type="submit">
        Go
      </button>
    </form>
  );
}
