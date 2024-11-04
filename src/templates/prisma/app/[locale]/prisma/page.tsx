import React from 'react'
import { Typography, Box } from '@mui/material'
import { prisma } from '@/util/prismaClient'
import { city } from '@/prisma/client'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/util/types'
import { Metadata } from 'next'
import TranslationProvider from '@/components/TranslationProvider'

export const metadata: Metadata = {
  title: 'Prisma Page',
}

interface PrismaPageData {
  cities: city[]
}

async function getPageData() {
  const cities = await prisma.city.findMany({
    // find cities with a population >= 1000000
    where: { Population: { gte: 1000000 } },
    // order results in descending order
    orderBy: { Population: 'desc' },
  })
  return {
    cities: cities,
  }
}

export default async function PrismaPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { t, options } = await initTranslations(locale, ['common', 'prismaPage'])
  const pageData: PrismaPageData = await getPageData()

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          {t('cityList', { ns: 'prismaPage' })}
        </Typography>
        {pageData.cities.map((city: city) => (
          <Box key={city.ID}>
            <Typography>
              {city.Name} - {city.Population}
            </Typography>
          </Box>
        ))}
      </Box>
    </TranslationProvider>
  )
}
