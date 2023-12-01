import initTranslations from '@/app/i18n'
import ClientComponent from './ClientComponent'
import { PageProps } from '@/app/[locale]/page'
import TranslationProvider from '@/components/TranslationProvider'
import { Box } from '@mui/material'

export const metadata = {
  title: 'Server Actions',
}

export default async function ServerActionsPage({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ClientComponent />
      </Box>
    </TranslationProvider>
  )
}
