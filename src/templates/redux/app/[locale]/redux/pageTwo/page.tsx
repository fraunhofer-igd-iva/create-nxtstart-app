import React from 'react'
import TranslationProvider from '@/components/TranslationProvider'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/app/[locale]/page'
import AsyncStateUpdateComponent from './AsyncStateUpdateComponent'

export const metadata = {
  title: 'Redux State Management',
}

export default async function Redux2Page({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <AsyncStateUpdateComponent />
    </TranslationProvider>
  )
}
