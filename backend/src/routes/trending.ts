import { Router } from 'express';

export const trendingRouter = Router();

trendingRouter.get('/', async (req, res, next) => {
  const limit = Number(req.query.limit ?? 25);
  const page = Number(req.query.page ?? 1);
  const offset = (page - 1) * limit;

  const url = 
    `https://api.giphy.com/v1/gifs/trending` +
    `?api_key=${process.env.GIPHY_API_KEY}` +
    `&limit=${limit}&offset=${offset}`;

  console.log('Fetching from Giphy:', url);  // Log request URL

  try {
    const apiRes = await fetch(url);
    const json = await apiRes.json();

    console.log('Giphy API response:', json);  // Log full response from Giphy

    const { data, pagination } = json;

    res.json({
      gifs: data,
      page,
      limit,
      totalCount: pagination?.total_count ?? data.length
    });
  } catch (err) {
    console.error('Error fetching from Giphy:', err);
    next(err);
  }
});
