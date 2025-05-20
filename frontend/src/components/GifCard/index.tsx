import styles from './GifCard.module.css';

export interface Gif {
  id: string;
  title: string;
  images: { fixed_width: { url: string } };
}

export function GifCard({ gif }: { gif: Gif }) {
  return (
    <article className={styles.card} key={gif.id}>
      <img src={gif.images.fixed_width.url} alt={gif.title} />
      <p className={styles.title}>{gif.title}</p>
    </article>
  );
}
