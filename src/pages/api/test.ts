import { NextApiRequest, NextApiResponse } from 'next';

import Web3 from 'web3';
const web3 = new Web3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // const { body: { signature } } = req
    // console.log(signature);
    // const recoveredAddress = await web3.eth.personal.ecRecover('test', signature);

    res.status(200).json('test')
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
