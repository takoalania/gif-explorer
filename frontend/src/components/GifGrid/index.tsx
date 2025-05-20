import type { Gif } from '../../types';
import { GifCard } from '../GifCard';
import styles from './GifGrid.module.css';

interface Props {
  gifs: Gif[];
}

export function GifGrid({ gifs }: Props) {
  return (
    <section className={styles.grid}>
      {gifs.map(gif => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </section>
  );
}
