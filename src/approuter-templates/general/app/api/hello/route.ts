import { NextRequest } from 'next/server'

type Data = {
  name: string
}

/**
 * This endpoint is the default next js api endpoint example
 * @allowedMethods GET
 * @returns body containing the name John Doe
 */
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  return Response.json({ name: name }, { status: 200 })
}
