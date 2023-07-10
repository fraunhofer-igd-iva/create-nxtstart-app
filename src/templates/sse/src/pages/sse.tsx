import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Head from 'next/head';
import { Data } from '../util/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BarChart from '../components/d3/BarChart';
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

export default function SSEPage() {

  const [source, setSource] = React.useState<EventSource | undefined>(undefined)
  const [dataArray, setDataArray] = React.useState<Data[]>([])
  const [connectionId, setConnectionId] = React.useState<string | undefined>(undefined)

  // properly kill the connection after receiving all events (requires knowledge about total number of events)
  React.useEffect(() => {
    if (dataArray.length > 0 && dataArray.length === dataArray[0].totalDataPoints) {
      handleStop()
    }
  }, [dataArray])

  const randomUpdate = () => {
    const index = Math.floor(Math.random() * dataArray.length)
    const randomValue = Math.floor(Math.random() * 10000000)
    setDataArray(prev => {
      prev[index].value = randomValue
      return Array.of(...prev)
    })
  }

  const handleStart = () => {
    const newSource = new EventSource('/api/sse/nextjs/messageBroker')
    newSource.onmessage = (event) => {
      if (event.lastEventId) {
        setConnectionId(event.lastEventId)
      }
      setDataArray(prev => [...prev, JSON.parse(event.data)])
    }
    setSource(newSource)
  }

  const handleStop = () => {
    if (source && connectionId) {
      source.close()
      setSource(undefined)
      fetch(`/api/sse/nextjs/messageBroker`, { method: 'POST', body: JSON.stringify({ id: connectionId }) })
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
      <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          Press START to initiate data fetching via server-sent-events.
          The D3 chart will dynamically update with the incoming data.
          STOP closes the connection. Press CLEAR to reset the data.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
          <Button variant={'contained'} onClick={handleStart} sx={{ mx: 2 }}>Start</Button>
          <Button variant={'contained'} onClick={handleStop} sx={{ mx: 2 }}>Stop</Button>
          <Button variant={'contained'} onClick={handleClear} sx={{ mx: 2 }}>Clear</Button>
          <Button variant={'contained'} onClick={randomUpdate} sx={{ mx: 2 }}>Random Update</Button>
        </Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: 4,
        }}>
          <BarChart width={1000} height={600} data={dataArray} />
        </Box>
      </Box>
    </div>
  )
}
