import React from 'react'
import { Typography, Box } from '@mui/material'
import Head from 'next/head'
import { prisma } from '@/util/prismaClient'
import { city } from '../../prisma/.prisma/client'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface PrismaPageProps {
  cities: city[]
  message: string
}

export const getServerSideProps: GetServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const cities = await prisma.city.findMany({
    // find cities with a population >= 1000000
    where: { Population: { gte: 1000000 } },
    // order results in descending order
    orderBy: { Population: 'desc' },
  })
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'prismaPage'])),
      // add cities to props
      cities: cities,
    },
  }
}

export default function PrismaPage(props: PrismaPageProps) {
  const { t } = useTranslation(['prismaPage'])

  return (
    <div>
      <Head>
        <title>Prisma Test</title>
      </Head>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          {t('cityList')}
        </Typography>
        {props.cities.map((city) => (
          <Box key={city.ID}>
            <Typography>
              {city.Name} - {city.Population}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  )
}
