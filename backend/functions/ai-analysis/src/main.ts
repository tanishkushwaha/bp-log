import { config } from 'dotenv';
config();
import { getHandler } from './routes/getRoutes.js';
import { postHandler } from './routes/postRoutes.js';

export default async ({ req, res, log, error }: any) => {
  if (req.method === 'GET') {
    return (
      getHandler(req.path)?.(req, res) ?? res.json({ error: 'Not Found' }, 404)
    );
  }

  if (req.method === 'POST') {
    return (
      postHandler(req.path)?.(req, res) ?? res.json({ error: 'Not Found' }, 404)
    );
  }

  return res.json({ error: 'Method Not Allowed' }, 405);
};
