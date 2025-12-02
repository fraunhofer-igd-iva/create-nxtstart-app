'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { Data } from '@/util/types'

export default function SseComponent() {
  const [source, setSource] = React.useState<EventSource | undefined>(undefined)
  const [dataArray, setDataArray] = React.useState<Data[]>([])
  const [connectionId, setConnectionId] = React.useState<string | undefined>(undefined)

  const handleStart = () => {
    const newSource = new EventSource('/api/sse')
    newSource.onmessage = (event) => {
      if (event.lastEventId) {
        setConnectionId(event.lastEventId)
      }
      setDataArray((prev) => [...prev, JSON.parse(event.data)])
    }
    setSource(newSource)
  }

  const handleStop = React.useCallback(() => {
    if (source && connectionId) {
      source.close()
      setSource(undefined)
      fetch(`/api/sse`, { method: 'POST', body: JSON.stringify({ id: connectionId }) })
    }
  }, [source, connectionId])

  const handleClear = () => {
    setDataArray([])
  }

  // properly kill the connection after receiving all events (requires knowledge about total number of events)
  React.useEffect(() => {
    if (dataArray.length > 0 && dataArray.length === dataArray[0].totalDataPoints) {
      handleStop()
    }
  }, [dataArray, handleStop])

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
        {dataArray.map((val) => <Box key={val.label}>{`${val.label} - ${val.value}\n`}</Box>)}
      </Box>
    </Box>
  )
}
