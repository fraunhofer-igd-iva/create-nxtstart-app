import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import { getCounterData } from '@/store/slices/counterSlice'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default function Redux2Page() {
  // access state using a function
  const counter = useAppSelector((state) => state.counter.value)
  // or using the custom selector
  // const counter = useAppSelector(selectCount)

  const dispatch = useAppDispatch()

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
        <title>Redux State Management</title>
      </Head>
      <Typography>Current counter:</Typography>
      <Typography variant={'h2'}>{counter}</Typography>
      <Button onClick={() => dispatch(getCounterData())}>Update State Async</Button>
    </Box>
  )
}
