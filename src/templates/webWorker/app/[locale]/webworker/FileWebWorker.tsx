'use client'

import React from 'react'
import { Box, Button } from '@mui/material'

export default function FileWebWorker() {
  const jsonWorkerRef = React.useRef<Worker>(null)
  const txtWorkerRef = React.useRef<Worker>(null)

  React.useEffect(() => {
    jsonWorkerRef.current = new Worker(new URL('../../../webWorker/jsonWorker.ts', import.meta.url))
    jsonWorkerRef.current.onmessage = (event: MessageEvent<number>) =>
      console.log(`JSON WebWorker Response => ${event.data}`)
    return () => {
      jsonWorkerRef.current?.terminate()
    }
  }, [])

  React.useEffect(() => {
    txtWorkerRef.current = new Worker(new URL('../../../webWorker/txtWorker.ts', import.meta.url))
    txtWorkerRef.current.onmessage = (event: MessageEvent<number>) =>
      console.log(`TXT WebWorker Response => ${event.data}`)
    return () => {
      txtWorkerRef.current?.terminate()
    }
  }, [])

  const sendJson = (file: File) => {
    if (file) {
      jsonWorkerRef.current?.postMessage(file)
    }
  }

  const sendTxt = (file: File) => {
    if (file) {
      if (file.size > 450 * 1024 * 1024) {
        for (let i = 0; i < file.size; i += 450 * 1024 * 1024) {
          txtWorkerRef.current?.postMessage(
            file.slice(i, i + 450 * 1024 * 1024 < file.size ? i + 450 * 1024 * 1024 : file.size)
          )
        }
      } else {
        txtWorkerRef.current?.postMessage(file)
      }
    }
  }

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 8 }}>
        <Button component={'label'} variant={'contained'}>
          Process JSON using Web Worker
          <input
            type={'file'}
            accept={'.json'}
            hidden
            onChange={(event) => {
              if (event.target.files) {
                sendJson(event.target.files[0])
              }
            }}
          />
        </Button>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 8 }}>
        <Button component={'label'} variant={'contained'}>
          Process TXT using Web Worker
          <input
            type={'file'}
            accept={'.txt'}
            hidden
            onChange={(event) => {
              if (event.target.files) {
                sendTxt(event.target.files[0])
              }
            }}
          />
        </Button>
      </Box>
    </Box>
  )
}
