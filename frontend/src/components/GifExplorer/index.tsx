import { useState, useEffect, type FormEvent } from 'react';
import { SearchBar }  from '../SearchBar';
import { GifGrid }    from '../GifGrid';
import { Pagination } from '../Pagination';
import type { Gif }   from '../../types';
import styles from './GifExplorer.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function GifExplorer() {
  const [gifs, setGifs]       = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [query, setQuery]     = useState('');
  const [page, setPage]       = useState(1);
  const limit = 25;

  const buildUrl = (q: string, p: number) => {
    const endpoint = q ? 'search' : 'trending';
    const search = `${q ? `?q=${encodeURIComponent(q)}&` : '?'}page=${p}&limit=${limit}`;
    return `${API_BASE_URL}/${endpoint}${search}`;
  };

  const fetchGifs = async (q: string, p: number) => {
    setLoading(true);
    try {
      const res  = await fetch(buildUrl(q, p));

      if (!res.ok) {
        throw new Error(`API error (${res.status})`);
      }

      const data = await res.json();
      setGifs(data.gifs);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load GIFs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    const p = Number(params.get('page') ?? '1');
    setQuery(q);
    setPage(p);
    const rewrite = new URLSearchParams();
    if (q) rewrite.set('q', q);
    rewrite.set('page', String(p));
    window.history.replaceState(null, '', `/?${rewrite.toString()}`);
    fetchGifs(q, p);
  }, []);

  const goTo = (q: string, p: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    params.set('page', String(p));
    window.history.replaceState(null, '', `/?${params.toString()}`);
    setPage(p);
    fetchGifs(q, p);
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = query.trim();

    goTo(term, 1);
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar 
        value={query} 
        onChange={setQuery} 
        onSearch={onSearch} 
      />

      {loading && <div className={styles.loading}></div>}

      {!loading && error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => fetchGifs(query, page)}>Retry</button>
        </div>
      )}

      {!loading && !error && gifs.length === 0 && (
        <div className={styles.empty}>
          <p>No GIFs found. Try searching for something else!</p>
        </div>
      )}

      {!loading && !error && gifs.length > 0 && (
        <>
          <GifGrid gifs={gifs} />
          <Pagination
            page={page}
            limit={limit}
            count={gifs.length}
            onPageChange={newPage => goTo(query, newPage)}
          />
        </>
      )}
    </div>
);

}
