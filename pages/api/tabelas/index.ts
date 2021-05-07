import cors from '../../../utils/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import jsonTabelas from '../../../database/tabelas.json';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // await cors(_req, res);

  const tabelas = jsonTabelas as any[];
  try {
    if (!tabelas) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(tabelas);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
