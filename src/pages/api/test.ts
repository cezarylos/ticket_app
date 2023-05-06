import { NextApiRequest, NextApiResponse } from 'next';

import Web3 from 'web3';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address, message, signature } = req.body;
    console.log(signature);
    try {

      const recoveredAddress = recoverPersonalSignature({
        signature,
        data: message,
      });

      console.log(recoveredAddress);
      console.log('---------')
      console.log(address);


      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        // Signature is valid
        res.status(201).json({})
        return;
      } else {
        // Signature is invalid
      }

    } catch (e) {
      console.error(e);
    }
    res.status(200).json({})
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
