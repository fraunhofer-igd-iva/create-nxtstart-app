import React from 'react'
import TranslationProvider from '@/components/TranslationProvider'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import AsyncStateUpdateComponent from './AsyncStateUpdateComponent'

export const metadata = {
  title: 'Redux State Management',
}

export default async function Redux2Page(props: { params: PageProps }) {
  const { locale } = await props.params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <AsyncStateUpdateComponent />
    </TranslationProvider>
  )
}
