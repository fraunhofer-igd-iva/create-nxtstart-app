import { NextRequest } from 'next/server'

/**
 * This endpoint returns a static counter value
 * @allowedMethods GET
 * @returns body contains the counter value or an error message if appropriate
 */
export async function GET(req: NextRequest) {
  return Response.json({ value: 42 }, { status: 200 })
}
