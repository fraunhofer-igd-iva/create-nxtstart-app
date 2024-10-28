import React from 'react'
import styles from './Redux.module.css'
import { Container, Typography, Box } from '@mui/material'
import Link from 'next/link'
import { PageProps } from '@/util/types'
import initTranslations from '@/app/i18n'
import TranslationProvider from '@/components/TranslationProvider'
import StateComponent from './StateComponent'

export const metadata = {
  title: 'Redux State Management',
}

export default async function ReduxPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Container className={styles.content}>
        <Box
          sx={{
            my: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={'body1'} color={'primary'}>
            Redux provides Components for sharing state across your application and between pages.
          </Typography>
          <Link href={'/redux/pageTwo'}>
            <Typography color={'secondary'}>Link to site accessing this state</Typography>
          </Link>
        </Box>
        <StateComponent />
      </Container>
    </TranslationProvider>
  )
}
