import { NextApiRequest, NextApiResponse } from 'next';

import path from 'path';
import fs from 'fs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, limit } = req.query;
    if (name instanceof Array || name === undefined || name === "") {
      res.status(400).json({ statusCode: 500, message: 'Param name Error' });
      return;
    }

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'database',
      name.toLowerCase() + '.json'
    );

    const data = fs.readFileSync(filePath, 'utf8');

    const tabela: any[] = JSON.parse(data.toUpperCase());

    if (
      !(limit instanceof Array) &&
      limit !== undefined &&
      !Number.isNaN(Number(limit))
    ) {
      res.status(200).json(tabela.splice(0, Number(limit)));
      return;
    }

    res.status(200).json(tabela);
    return;
  } catch (err) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
