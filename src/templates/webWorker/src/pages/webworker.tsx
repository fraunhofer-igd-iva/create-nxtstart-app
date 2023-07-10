import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Button } from '@mui/material';
import { pi } from '../../webWorker/worker';
import { GetStaticPropsContext } from 'next';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function WebWorkerPage() {

  const workerRef = React.useRef<Worker>()
  const jsonWorkerRef = React.useRef<Worker>()
  const txtWorkerRef = React.useRef<Worker>()

  React.useEffect(() => {
    workerRef.current = new Worker(new URL('../../webWorker/worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  React.useEffect(() => {
    jsonWorkerRef.current = new Worker(new URL('../../webWorker/jsonWorker.ts', import.meta.url))
    jsonWorkerRef.current.onmessage = (event: MessageEvent<number>) =>
      console.log(`JSON WebWorker Response => ${event.data}`)
    return () => {
      jsonWorkerRef.current?.terminate()
    }
  }, [])

  React.useEffect(() => {
    txtWorkerRef.current = new Worker(new URL('../../webWorker/txtWorker.ts', import.meta.url))
    txtWorkerRef.current.onmessage = (event: MessageEvent<number>) =>
      console.log(`TXT WebWorker Response => ${event.data}`)
    return () => {
      txtWorkerRef.current?.terminate()
    }
  }, [])

  const piIterations = 10000000000

  const processPiWebWorker = React.useCallback(() => {
    workerRef.current?.postMessage(piIterations)
  }, [])

  const processPiMainThread = () => {
    alert(pi(piIterations))
  }

  const sendJson = (file: File) => {
    if (file) {
      jsonWorkerRef.current?.postMessage(file)
    }
  }

  const sendTxt = (file: File) => {
    if (file) {
      if (file.size > 450 * 1024 * 1024) {
        for (let i = 0; i < file.size; i += 450 * 1024 * 1024) {
          txtWorkerRef.current?.postMessage(file.slice(i, i + 450 * 1024 * 1024 < file.size ? i + 450 * 1024 * 1024 : file.size))
        }
      } else {
        txtWorkerRef.current?.postMessage(file)
      }
    }
  }

  return (
    <Box>
      <Head>
        <title>Web Worker</title>
      </Head>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 8 }}>
        <Button onClick={processPiWebWorker} variant={'contained'} sx={{ mr: 4 }}>
          Calculate Pi using Web Worker
        </Button>
        <Button onClick={processPiMainThread} variant={'contained'}>
          Calculate Pi using Main Thread
        </Button>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 8 }}>
        <Button component={'label'} variant={'contained'}>
          Process JSON using Web Worker
          <input
            type={'file'}
            accept={'.json'}
            hidden
            onChange={
              event => {
                if (event.target.files) {
                  sendJson(event.target.files[0])
                }
              }
            }
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
            onChange={
              event => {
                if (event.target.files) {
                  sendTxt(event.target.files[0])
                }
              }
            }
          />
        </Button>
      </Box>
    </Box>
  )
}
