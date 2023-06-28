// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EventSource from 'eventsource';

const pythonBackendIp = 'http://127.0.0.1:5000'

const sseConnections: { [key: string]: EventSource } = {}

const includesSseConnection = (id: string) => {
  return Object.keys(sseConnections).includes(id)
}

const addSseConnection = (id: string, src: EventSource) => {
  sseConnections[id] = src
}

const closeSseConnection = (id: string) => {
  if (includesSseConnection(id)) {
    console.log('close python sse ', id)
    sseConnections[id].close()
    delete sseConnections[id]
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache,no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Encoding', 'none')
    res.status(200)
    // first event sent immediately so the request doesn't go unanswered for too long, empty code 200
    res.write('')

    const newSource = new EventSource(`${pythonBackendIp}/data/sse`)
    newSource.onmessage = (event: any) => {
      if (event.lastEventId) {
        if (!includesSseConnection(event.lastEventId)) {
          addSseConnection(event.lastEventId, newSource)
        }
        if (includesSseConnection(event.lastEventId)) {
          res.write(`id: ${event.lastEventId}\n\n`)
          res.write(`data: ${event.data}\n\n`)
        }
      }
    }

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
