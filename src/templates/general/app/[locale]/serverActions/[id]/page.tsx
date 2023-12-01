import initTranslations from '@/app/i18n'
import { PageProps } from '@/app/[locale]/page'
import TranslationProvider from '@/components/TranslationProvider'
import { Box } from '@mui/material'

type DynamicPathPageProps = PageProps & {
  params: { id: number }
}

export const metadata = {
  title: 'Dynamic Path',
}

export default async function DynamicPathPage({ params: { locale, id } }: DynamicPathPageProps) {
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>{id}</Box>
    </TranslationProvider>
  )
}
