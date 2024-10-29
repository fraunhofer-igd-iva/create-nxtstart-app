'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { Data } from '@/util/types'
import BarChart from '@/components/d3/BarChart'

export default function SseComponent() {
  const [source, setSource] = React.useState<EventSource | undefined>(undefined)
  const [dataArray, setDataArray] = React.useState<Data[]>([])
  const [connectionId, setConnectionId] = React.useState<string | undefined>(undefined)

  const randomUpdate = () => {
    const index = Math.floor(Math.random() * dataArray.length)
    const randomValue = Math.floor(Math.random() * 10000000)
    setDataArray((prev) => {
      prev[index].value = randomValue
      return Array.of(...prev)
    })
  }

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
        <Button variant={'contained'} onClick={randomUpdate} sx={{ mx: 2 }}>
          Random Update
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pt: 4,
        }}
      >
        <BarChart width={1000} height={600} data={dataArray} />
      </Box>
    </Box>
  )
}
