import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Head from 'next/head'
import useSWR from 'swr'
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

export default function SWRPage() {
  const fetcher = (input: RequestInfo | URL) => fetch(input).then((res) => res.json())
  const { data, error, isLoading } = useSWR('/api/hello', fetcher)

  const styles = {
    textColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }

  return (
    <Box sx={styles.textColumn}>
      <Head>
        <title>SWR Data Fetching</title>
      </Head>
      {isLoading && <CircularProgress />}
      {error && (
        <Typography variant={'h5'} color={'secondary'}>
          Error loading data.
        </Typography>
      )}
      {data && (
        <Typography variant={'h5'} color={'primary'}>
          Welcome back, {data.name}.
        </Typography>
      )}
    </Box>
  )
}
