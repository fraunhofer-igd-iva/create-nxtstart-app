import initTranslations from '../../i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { PageProps } from '@/app/[locale]/page'
import { Box, Typography } from '@mui/material'

// needed for dynamic metadata
export async function generateMetadata({ params: { locale } }: PageProps) {
  const { t } = await initTranslations(locale, ['common'])

  return {
    title: t('imprint'),
  }
}

export default async function PrivacyPage({ params: { locale } }: PageProps) {
  const { t, options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h4'}>{t('imprint')}</Typography>
      </Box>
    </TranslationProvider>
  )
}
