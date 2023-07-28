import React from 'react'
import { Typography, Box } from '@mui/material'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSession } from 'next-auth/react'

interface RestrictedPageProps {
  message: string
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      // add content to props
      message: session
        ? 'You can view the restricted content because you are logged in.'
        : 'You need to login to see the restricted content.',
    },
  }
}

export default function RestrictedPage(props: RestrictedPageProps) {
  return (
    <div>
      <Head>
        <title>Restricted Page</title>
      </Head>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          {props.message}
        </Typography>
      </Box>
    </div>
  )
}
