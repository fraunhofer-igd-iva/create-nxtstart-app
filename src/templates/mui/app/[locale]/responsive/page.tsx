import React from 'react'
import { Box, Typography } from '@mui/material'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import { Metadata } from 'next'
import TranslationProvider from '@/components/TranslationProvider'
import MuiGrid from '@/app/[locale]/responsive/MuiGrid'

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
          <MuiGrid />
        </Box>
      </Box>
    </TranslationProvider>
  )
}
