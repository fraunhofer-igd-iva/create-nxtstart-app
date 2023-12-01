import { Box } from '@mui/material'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/app/[locale]/page'
import TranslationProvider from '@/components/TranslationProvider'
import SwrComponent from './SwrComponent'

export const metadata = {
  title: 'SWR Data Fetching',
}

export default async function SWRPage({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])

  const styles = {
    textColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={styles.textColumn}>
        <SwrComponent />
      </Box>
    </TranslationProvider>
  )
}
