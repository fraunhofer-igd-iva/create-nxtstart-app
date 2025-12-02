import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import TranslationProvider from '@/components/TranslationProvider'
import SseComponent from './SseComponent'
import { Box, Typography } from '@mui/material'

export const metadata = {
  title: 'Server Sent Events',
}

export default async function SSEPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          Press START to initiate data fetching via server-sent-events. STOP closes the connection. Press CLEAR to reset the data.
        </Typography>
        <SseComponent />
      </Box>
    </TranslationProvider>
  )
}
