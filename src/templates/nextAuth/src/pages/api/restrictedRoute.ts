import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    res.status(200)
    res.send({
      content: 'This is protected content. You can access this content because you are signed in.',
    })
  } else {
    res.status(401)
    res.send({
      error: 'You must be signed in to view the protected content on this page.',
    })
  }
}
