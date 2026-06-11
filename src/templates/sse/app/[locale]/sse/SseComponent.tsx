'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { Data } from '@/util/types'

export default function SseComponent() {
  const sourceRef = React.useRef<EventSource | null>(null)
  const connectionIdRef = React.useRef<string | null>(null)
  const [dataArray, setDataArray] = React.useState<Data[]>([])

  const handleStart = () => {
    const newSource = new EventSource('/api/sse')
    sourceRef.current = newSource

    newSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
      if (event.lastEventId) {
        connectionIdRef.current = event.lastEventId
      }

      setDataArray((prev) => {
        const next = [...prev, parsed]

        if (
          next.length > 0 &&
          next.length === next[0].totalDataPoints
        ) {
          newSource.close()
          sourceRef.current = null
          if (event.lastEventId) {
            fetch('/api/sse', {
              method: 'POST',
              body: JSON.stringify({ id: event.lastEventId }),
            })
          }
        }

        return next
      })
    }
  }

  const handleStop = React.useCallback(() => {
    const source = sourceRef.current
    const id = connectionIdRef.current
    if (source && id) {
      source.close()
      sourceRef.current = null
      fetch(`/api/sse`, { method: 'POST', body: JSON.stringify({ id: id }) })
    }
  }, [])

  const handleClear = () => {
    setDataArray([])
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', mt: 4 }}>
        <Button variant={'contained'} onClick={handleStart} sx={{ mx: 2 }}>
          Start
        </Button>
        <Button variant={'contained'} onClick={handleStop} sx={{ mx: 2 }}>
          Stop
        </Button>
        <Button variant={'contained'} onClick={handleClear} sx={{ mx: 2 }}>
          Clear
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 4,
          height: 300,
        }}
      >
        {dataArray.map((val) => (
          <Box key={val.label}>{`${val.label} - ${val.value}\n`}</Box>
        ))}
      </Box>
    </Box>
  )
}
