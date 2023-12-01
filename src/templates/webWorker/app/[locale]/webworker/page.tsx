import TranslationProvider from '@/components/TranslationProvider'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/app/[locale]/page'
import PiWebWorker from './PiWebWorker'
import FileWebWorker from './FileWebWorker'

export const metadata = {
  title: 'Web Worker',
}

export default async function WebWorkerPage({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])

  const piIterations = 10000000000

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <PiWebWorker piIterations={piIterations} />
      <FileWebWorker />
    </TranslationProvider>
  )
}
