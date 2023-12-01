import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * This endpoint is used to hide content behind user authentication
 * @required valid user session
 * @allowedMethods GET
 * @returns body contains secured content or an error if user is not authenticated
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
  } else {
    res.status(405).end()
  }
}
