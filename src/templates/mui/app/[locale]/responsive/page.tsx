import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MuiGridExample from '@/app/[locale]/responsive/MuiGridExample'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import { Metadata } from 'next'
import TranslationProvider from '@/components/TranslationProvider'

export const metadata: Metadata = {
  title: 'Responsive Design',
}

export default async function ResponsiveDesignPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ p: 5 }}>
        <Typography sx={{ textAlign: 'center', pb: 5 }}>
          Responsive grids created using Material UI Grid components. Try resizing the window to explore the effects and
          check out `/components/MuiGridExample.tsx` to edit the page.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid container spacing={2} alignItems={'center'}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
              return (
                <Grid key={number} item md={6}>
                  <MuiGridExample />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>
    </TranslationProvider>
  )
}
