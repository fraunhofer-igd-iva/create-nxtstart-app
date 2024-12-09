'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { pi } from '@/webWorker/worker'

interface PiWebWorkerProps {
  piIterations: number
}

export default function PiWebWorker(props: PiWebWorkerProps) {
  const workerRef = React.useRef<Worker>(null)

  React.useEffect(() => {
    workerRef.current = new Worker(new URL('../../../webWorker/worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) => alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const processPiWebWorker = React.useCallback(() => {
    workerRef.current?.postMessage(props.piIterations)
  }, [props.piIterations])

  const processPiMainThread = () => {
    alert(pi(props.piIterations))
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 8 }}>
      <Button onClick={processPiWebWorker} variant={'contained'} sx={{ mr: 4 }}>
        Calculate Pi using Web Worker
      </Button>
      <Button onClick={processPiMainThread} variant={'contained'}>
        Calculate Pi using Main Thread
      </Button>
    </Box>
  )
}
