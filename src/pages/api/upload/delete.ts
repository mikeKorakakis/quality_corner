import path from "path";
import fs from "fs";
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req && req.method === "POST") { 
    const filename = req.query.filename as string;
    const file = path.join(process.cwd(), "public", "upload", filename);
    try {
      await fs.unlinkSync(file);
      return res.status(200).send({ filename });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
