import { Router } from 'express';

export const trendingRouter = Router();

trendingRouter.get('/', async (req, res, next) => {
  const limit  = Number(req.query.limit ?? 25);
  const offset = (Number(req.query.page ?? 1) - 1) * limit;

  try {
    const apiRes = await fetch(
      `https://api.giphy.com/v1/gifs/trending` +
      `?api_key=${process.env.GIPHY_API_KEY}` +
      `&limit=${limit}&offset=${offset}`
    );
    const { data } = (await apiRes.json()) as { data: any[] };
    res.json({ page: offset/limit + 1, limit, gifs: data });
  } catch (err) {
    next(err);
  }
});

