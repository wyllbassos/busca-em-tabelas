import { NextApiRequest, NextApiResponse } from 'next';
import jsonProdutos from '../../../database/produtos.json';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // await cors(_req, res);

  const produtos: any[] = jsonProdutos as any[];
  try {
    if (!produtos) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
