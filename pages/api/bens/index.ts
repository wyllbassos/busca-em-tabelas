import cors from '../../../utils/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import jsonBens from '../../../database/bens.json';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // await cors(_req, res);

  const bens = jsonBens as any[];
  try {
    if (!bens) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(bens);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
