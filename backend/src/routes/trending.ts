import { Router } from 'express';

export const trendingRouter = Router();

trendingRouter.get('/', async (req, res, next) => {
  const limit  = Number(req.query.limit ?? 25);
  const page   = Number(req.query.page ?? 1); // ✅ define `page`
  const offset = (page - 1) * limit;

  try {
    const apiRes = await fetch(
      `https://api.giphy.com/v1/gifs/trending` +
      `?api_key=${process.env.GIPHY_API_KEY}` +
      `&limit=${limit}&offset=${offset}`
    );

    const { data, pagination } = await apiRes.json();

    res.json({
      gifs: data,
      page,
      limit,
      totalCount: pagination?.total_count ?? data.length
    });
  } catch (err) {
    next(err);
  }
});
