import { NextApiRequest, NextApiResponse } from 'next';
import * as crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const message = 'Hello, world!'; // Replace this with your own message
    const messageHash = crypto.createHash('sha256').update(message).digest();
    res.status(200).json({ message, messageHash })
  }
}
