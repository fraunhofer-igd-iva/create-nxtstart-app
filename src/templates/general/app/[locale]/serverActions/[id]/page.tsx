import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import TranslationProvider from '@/components/TranslationProvider'
import { Box } from '@mui/material'

type DynamicPathPageProps = PageProps & Promise<{
  id: number
}>

export const metadata = {
  title: 'Dynamic Path',
}

export default async function DynamicPathPage(props: { params: DynamicPathPageProps }) {
  const { locale, id } = await props.params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>{id}</Box>
    </TranslationProvider>
  )
}
