import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default function BackendProxyPage() {
  const [source, setSource] = React.useState<EventSource | undefined>(undefined)
  const [dataArray, setDataArray] = React.useState<{ id: string }[]>([])
  const [connectionId, setConnectionId] = React.useState<string | undefined>(undefined)

  // something like this can be used to properly kill the connection after receiving all events (requires knowledge about total number of events)
  React.useEffect(() => {
    if (dataArray.length === 10) {
      handleStop()
    }
  }, [dataArray])

  const handleStart = () => {
    const newSource = new EventSource('/api/sse/proxy/pythonBroker')
    newSource.onmessage = (event) => {
      if (event.lastEventId) {
        setConnectionId(event.lastEventId)
      }
      setDataArray((prev) => [...prev, JSON.parse(event.data)])
    }
    setSource(newSource)
  }

  const handleStop = () => {
    if (source) {
      source.close()
      setSource(undefined)
      fetch(`/api/sse/proxy/pythonBroker`, { method: 'POST', body: JSON.stringify({ id: connectionId }) })
    }
  }

  const handleClear = () => {
    setDataArray([])
  }

  return (
    <div>
      <Head>
        <title>Server Sent Events</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          Press START to initiate data fetching via server-sent-events. STOP closes the connection. Press CLEAR to reset
          the data.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
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
            justifyContent: 'center',
            width: '80dvw',
            flexWrap: 'wrap',
            pt: 4,
          }}
        >
          {dataArray.map((entry, index) => (
            <Typography key={index} sx={{ m: 2 }}>
              {entry.id}
            </Typography>
          ))}
        </Box>
      </Box>
    </div>
  )
}
