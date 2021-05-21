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

    const rootPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
    );
    const originalPassword = fs.readFileSync(path.join(rootPath,'password.txt'), 'utf8');

    if (!originalPassword) {
      res.status(400).json({ statusCode: 500, message: 'Internal Error No Password.txt File' });
      return;
    }

    if (password !== originalPassword) {
      res.status(400).json({ statusCode: 400, message: 'password Error' });
      return;
    }

    if (name instanceof Array || name === undefined || name === "") {
      res.status(400).json({ statusCode: 400, message: 'Param name Error' });
      return;
    }

    if (table === undefined || table === "" || table.length === undefined || table.length === 0) {
      res.status(400).json({ statusCode: 400, message: 'Param table Error' });
      return;
    }

    const filePath = path.join(rootPath, 'database', '\\', name.toLowerCase() + '.json');

    fs.writeFileSync( filePath, JSON.stringify(table))

    return res.status(200).json("Ok");
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
