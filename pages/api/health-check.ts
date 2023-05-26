import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json("OK");
    return;
  } catch (err) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
