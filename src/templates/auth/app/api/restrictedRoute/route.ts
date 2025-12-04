import { auth } from '@/auth'
import { headers } from 'next/headers'

/**
 * This endpoint is used to hide content behind user authentication
 * @required valid user session
 * @allowedMethods GET
 * @returns body contains secured content or an error if user is not authenticated
 */
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return Response.json(
      { error: 'You must be signed in to view the protected content from the API.' },
      { status: 401 }
    )
  }
  return Response.json(
    { content: 'This is protected API content. You can access this content because you are signed in as' },
    { status: 200 }
  )
}
