// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * This endpoint returns a static counter value
 * @allowedMethods GET
 * @returns body contains the counter value or an error message if appropriate
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ value: 42 })
  } else {
    res.status(405).end()
  }
}