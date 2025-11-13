// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from '@/util/types'
import { v4 as uuidV4 } from 'uuid'
import { NextRequest } from 'next/server'

// saves active connections
const sseConnections: string[] = []

const includesSseConnection = (id: string) => {
  return sseConnections.includes(id)
}

const addSseConnection = (id: string) => {
  sseConnections.push(id)
}

const closeSseConnection = (id: string) => {
  const index = sseConnections.indexOf(id)
  if (index !== -1) {
    sseConnections.splice(index, 1)
  }
}

/**
 * This endpoint manages server sent events containing city data
 * @allowedMethods GET, POST
 * @returns GET - server sent events stream containing data
 * @returns POST - close server sent events stream using id sent in body of request
 */
export async function GET() {
  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const newConnectionId = uuidV4()
  // insert new connection id into array
  addSseConnection(newConnectionId)
  // add connection id to messages
  writer.write(encoder.encode(`id: ${newConnectionId}\n\n`))

  // do your calculations / retrieve data and sent results back
  const data: Data[] = [
    { label: 'Mumbai (Bombay)', value: 10500000, totalDataPoints: 10 },
    { label: 'Seoul', value: 9981619, totalDataPoints: 10 },
    { label: 'São Paulo', value: 9968485, totalDataPoints: 10 },
    { label: 'Shanghai', value: 9696300, totalDataPoints: 10 },
    { label: 'Jakarta', value: 9604900, totalDataPoints: 10 },
    { label: 'Karachi', value: 9269265, totalDataPoints: 10 },
    { label: 'Istanbul', value: 8787958, totalDataPoints: 10 },
    { label: 'Ciudad de México', value: 8591309, totalDataPoints: 10 },
    { label: 'Moscow', value: 8389200, totalDataPoints: 10 },
    { label: 'New York', value: 8008278, totalDataPoints: 10 },
  ]

  // send results (in practice this should be in parallel with the calculations)
  let i = 0
  const intervalId = setInterval(async () => {
    // only send if connection is still active
    if (includesSseConnection(newConnectionId)) {
      if (i < data.length) {
        writer.write(encoder.encode(`data: ${JSON.stringify(data[i])}\n\n`))
        i++
      }
    } else {
      clearInterval(intervalId)
    }
  }, 1000)

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
    },
    status: 200,
  })
}

export async function POST(req: NextRequest) {
  // close connection to client with given id
  const connectionId = (await req.json()).id
  closeSseConnection(connectionId)
  return new Response(null, { status: 200 })
}
