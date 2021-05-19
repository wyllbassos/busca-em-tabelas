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
        res.status(400).json({ statusCode: 500, message: err });
        return;
      }

      const ret: any[] = []
      files.forEach((file) => {
        const [name] = file.split('.');
        if (!name) {
          console.log("Erro Arquivo .json invalido")
          return;
        }

        const data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        const tabela: any[] = JSON.parse(data);

        if (!(tabela instanceof Array)) {
          console.log(`Dados do arquivo ${file} estao invalidos.`)
          return;
        }

        const fields = Object.keys(tabela.splice(0, 1)[0]).map((field) =>
          field.toUpperCase()
        );
        ret.push({
          name,
          fields,
        })
      });

      return  res.status(200).json(ret);
    });
  } catch (err) {
    console.log(err)
    return  res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
