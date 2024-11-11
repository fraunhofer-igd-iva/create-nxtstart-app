import { NextRequest } from 'next/server'

/**
 * This endpoint is the default next js api endpoint example
 * @allowedMethods GET
 * @param name - the name to return in the response
 * @returns body containing the name sent as a path parameter
 */
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  return Response.json({ name: name }, { status: 200 })
}
