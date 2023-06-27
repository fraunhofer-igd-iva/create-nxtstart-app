import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import MuiGridExample from '../components/MuiGridExample';
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

export default function ResponsiveDesignPage() {

  return (
    <Box sx={{ p: 5 }}>
      <Head>
        <title>Responsive Design</title>
      </Head>
      <Typography sx={{ textAlign: 'center', pb: 5 }}>
        Responsive grids created using Material UI Grid components.
        Try resizing the window to explore the effects and check out
        `/components/MuiGridExample.tsx`
        to edit the page.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid container spacing={2} alignItems={'center'}>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => {
              return (
                <Grid key={number} item md={6}>
                  <MuiGridExample />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </Box>
  )
}
