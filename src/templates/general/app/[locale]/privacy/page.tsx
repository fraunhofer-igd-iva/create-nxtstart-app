import initTranslations from '../../i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { PageProps } from '@/util/types'
import { Box, Typography } from '@mui/material'

// needed for dynamic metadata
export async function generateMetadata(props: { params: PageProps }) {
  const { locale } = await props.params
  const { t } = await initTranslations(locale, ['common'])

  return {
    title: t('privacy'),
  }
}

export default async function PrivacyPage(props: { params: PageProps }) {
  const { locale } = await props.params
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
        <Typography variant={'h4'}>{t('privacy')}</Typography>
      </Box>
    </TranslationProvider>
  )
}
