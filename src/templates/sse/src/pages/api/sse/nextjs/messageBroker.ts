// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '@/util/types';
import { prisma } from '@/util/prismaClient';
import { v4 as uuidV4 } from 'uuid';

const sseConnections: string[] = []

const includesSseConnection = (id: string) => {
  return sseConnections.includes(id)
}

const addSseConnection = (id: string) => {
  sseConnections.push(id)
}

const closeSseConnection = (id: string) => {
  console.log('close sse ', id)
  const index = sseConnections.indexOf(id)
  if (index !== -1) {
    sseConnections.splice(index, 1)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // establish SSE connection with client
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Encoding', 'none')
    res.status(200)
    // first event sent immediately so the request doesn't go unanswered for too long, empty code 200
    res.write('')
    const newConnectionId = uuidV4()
    // insert new connection id into array
    addSseConnection(newConnectionId)
    // add connection id to messages
    res.write(`id: ${newConnectionId}\n\n`)

    // do your calculations / retrieve data and sent results back
    const numberOfDataPoints = 10
    const cities = await prisma.city.findMany({
      where: { Population: { gte: 1000000 } },
      orderBy: { Population: 'desc' },
      take: numberOfDataPoints
    })
    const data: Data[] = cities.map(c => {
      return { label: c.Name, value: c.Population, totalDataPoints: numberOfDataPoints }
    })

    // send results (in practice this should be in parallel with the calculations)
    let i = 0
    const intervalId = setInterval(async () => {
      // only send if connection is still active
      if (includesSseConnection(newConnectionId)) {
        if (i < data.length) {
          console.log('t')
          res.write(`data: ${JSON.stringify(data[i])}\n\n`)
          i++
        }
      } else {
        clearInterval(intervalId)
        res.end()
      }
    }, 1000)

  } else if (req.method === 'POST') {
    // close connection to client with given id
    const connectionId = JSON.parse(req.body).id
    closeSseConnection(connectionId)
    res.status(200)
    res.end()

  } else {
    res.status(405)
    res.end()
  }
}
