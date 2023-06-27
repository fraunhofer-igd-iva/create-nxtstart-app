import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Redux2Page() {

  const counter = useAppSelector(state => state.counter.value)

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
      <Typography>
        Current counter:
      </Typography>
      <Typography variant='h2'>
        {counter}
      </Typography>
    </Box>
  )
}
