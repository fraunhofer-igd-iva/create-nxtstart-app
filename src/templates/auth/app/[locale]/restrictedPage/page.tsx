import React from 'react'
import { Typography, Box } from '@mui/material'
import initTranslations from '@/app/i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { PageProps } from '@/util/types'
import { Metadata } from 'next'
import { auth } from '@/auth'
import ClientSideAuth from './ClientSideAuth'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Restricted Page',
}

interface RestrictedPageData {
  message: string
}

async function getPageData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return {
    message: session
      ? 'You can view the restricted content because you are logged in. It was loaded before the page html was sent to the client using the server components.'
      : 'You need to login to see the restricted content.',
  }
}

export default async function RestrictedPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { options } = await initTranslations(locale, ['common'])
  const pageData: RestrictedPageData = await getPageData()

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'} sx={{ mb: 4 }}>
          {pageData.message}
        </Typography>
        <ClientSideAuth />
      </Box>
    </TranslationProvider>
  )
}
