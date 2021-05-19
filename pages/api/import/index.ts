import { NextApiRequest, NextApiResponse } from 'next';

import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, table, password } = req.body;
    if (password !== '@AlmoxFibra') {
      res.status(400).json({ statusCode: 400, message: 'password Error' });
      return;
    }

    if (name instanceof Array || name === undefined) {
      res.status(400).json({ statusCode: 400, message: 'Param name Error' });
      return;
    }

    // return res.status(200).json({ name, table });

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'database',
      '\\',
      name.toLowerCase() + '.json'
    );

    fs.writeFileSync( filePath, JSON.stringify(table))

    return res.status(200).json("Ok");
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
