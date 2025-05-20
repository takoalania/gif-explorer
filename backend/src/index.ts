import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { LRUCache } from 'lru-cache';

import { healthRouter }   from './routes/health';
import { trendingRouter } from './routes/trending';
import { searchRouter }   from './routes/search';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(morgan('tiny'));

const cache = new LRUCache<string, any>({ max: 100, ttl: 1000 * 60 });

const withCache = (key: string, handler: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    const hit = cache.get(key);
    if (hit !== undefined) {
      res.setHeader('Cache-Control', 'public, max-age=60');
      return res.json(hit);
    }

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, body);
      res.setHeader('Cache-Control', 'public, max-age=60');
      return originalJson(body);
    };

    return handler(req, res, next);
  };
};

app.use('/api/healthz', healthRouter);

app.use('/api/trending', (req, res, next) => {
  const limit  = Number(req.query.limit  ?? 25);
  const page   = Number(req.query.page   ?? 1);
  const offset = (page - 1) * limit;
  const key    = `trending:${limit}:${offset}`;

  return withCache(key, trendingRouter)(req, res, next);
});

app.use('/api/search', (req, res, next) => {
  const q      = String(req.query.q      || '');
  const rating = String(req.query.rating || 'G');
  const limit  = Number(req.query.limit  ?? 25);
  const page   = Number(req.query.page   ?? 1);
  const offset = (page - 1) * limit;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter `q` is required' });
  }

  const key = `search:${q}:${rating}:${limit}:${offset}`;

  return withCache(key, searchRouter)(req, res, next);
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

const shutdown = () => {
  console.log('Shutting down …');
  server.close(() => process.exit(0));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
