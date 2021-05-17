import { NextApiRequest, NextApiResponse } from 'next';

import path from 'path';
import fs from 'fs';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const directoryPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'database'
    );
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, async (err, files) => {
      //handling error
      if (err) {
        res.status(500).json({ statusCode: 500, message: err });
      }

      const ret = files.map((file) => {
        const data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        const tabela: any[] = JSON.parse(data);
        const fields = Object.keys(tabela.splice(0, 1)[0]).map((field) =>
          field.toUpperCase()
        );
        return {
          name: file.split('.')[0].toUpperCase(),
          fields,
        };
      });

      res.status(200).json(ret);
      //.json(files.map((file) => file.split('.')[0].toUpperCase()));
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
