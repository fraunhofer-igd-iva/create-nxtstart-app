import React from 'react'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext } from 'next'

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default function ImprintPage() {
  return (
    <div>
      <Head>
        <title>Imprint</title>
      </Head>
      Imprint
    </div>
  )
}
