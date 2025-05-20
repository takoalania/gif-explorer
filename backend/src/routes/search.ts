import { Router, Request, Response, NextFunction } from 'express';

export const searchRouter = Router();

searchRouter.get(
  '/', 
  async (req: Request, res: Response, next: NextFunction) => {
    const q      = String(req.query.q  || '');
    const rating = String(req.query.rating || 'G');
    const page   = Number(req.query.page  ?? 1);
    const limit  = Number(req.query.limit ?? 25);
    const offset = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter `q` is required' });
    }

    try {
      const apiRes = await fetch(
        `https://api.giphy.com/v1/gifs/search` +
          `?api_key=${process.env.GIPHY_API_KEY}` +
          `&q=${encodeURIComponent(q)}` +
          `&rating=${rating}` +
          `&limit=${limit}&offset=${offset}`
      );
      const { data } = (await apiRes.json()) as { data: any[] };

      res.json({ page, limit, gifs: data });
    } catch (err) {
      next(err);
    }
  }
);
