import React from 'react'
import initTranslations from '../../i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { PageProps } from '@/app/[locale]/page'
import { Box, Typography } from '@mui/material'
import { Data } from '@/util/types'
import { DataPoint } from '@/components/d3/ScatterPlot'
import { Metadata } from 'next'
import BarChartContainer from '@/components/d3/BarChartContainer'
import ScatterPlotContainer from '@/components/d3/ScatterPlotContainer'

export const metadata: Metadata = {
  title: 'D3',
}

type D3PageData = {
  dataCities: Data[]
  dataScatter: DataPoint[]
}

async function getPageData() {
  const dataCities: Data[] = [
    { label: 'Mumbai (Bombay)', value: 10500000, totalDataPoints: 50 },
    { label: 'Seoul', value: 9981619, totalDataPoints: 50 },
    { label: 'São Paulo', value: 9968485, totalDataPoints: 50 },
    { label: 'Shanghai', value: 9696300, totalDataPoints: 50 },
    { label: 'Jakarta', value: 9604900, totalDataPoints: 50 },
    { label: 'Karachi', value: 9269265, totalDataPoints: 50 },
    { label: 'Istanbul', value: 8787958, totalDataPoints: 50 },
    { label: 'Ciudad de México', value: 8591309, totalDataPoints: 50 },
    { label: 'Moscow', value: 8389200, totalDataPoints: 50 },
    { label: 'New York', value: 8008278, totalDataPoints: 50 },
    { label: 'Tokyo', value: 7980230, totalDataPoints: 50 },
    { label: 'Peking', value: 7472000, totalDataPoints: 50 },
    { label: 'London', value: 7285000, totalDataPoints: 50 },
    { label: 'Delhi', value: 7206704, totalDataPoints: 50 },
    { label: 'Cairo', value: 6789479, totalDataPoints: 50 },
    { label: 'Teheran', value: 6758845, totalDataPoints: 50 },
    { label: 'Lima', value: 6464693, totalDataPoints: 50 },
    { label: 'Chongqing', value: 6351600, totalDataPoints: 50 },
    { label: 'Bangkok', value: 6320174, totalDataPoints: 50 },
    { label: 'Santafé de Bogotá', value: 6260862, totalDataPoints: 50 },
    { label: 'Rio de Janeiro', value: 5598953, totalDataPoints: 50 },
    { label: 'Tianjin', value: 5286800, totalDataPoints: 50 },
    { label: 'Kinshasa', value: 5064000, totalDataPoints: 50 },
    { label: 'Lahore', value: 5063499, totalDataPoints: 50 },
    { label: 'Santiago de Chile', value: 4703954, totalDataPoints: 50 },
    { label: 'St Petersburg', value: 4694000, totalDataPoints: 50 },
    { label: 'Calcutta [Kolkata]', value: 4399819, totalDataPoints: 50 },
    { label: 'Wuhan', value: 4344600, totalDataPoints: 50 },
    { label: 'Baghdad', value: 4336000, totalDataPoints: 50 },
    { label: 'Harbin', value: 4289800, totalDataPoints: 50 },
    { label: 'Shenyang', value: 4265200, totalDataPoints: 50 },
    { label: 'Kanton [Guangzhou]', value: 4256300, totalDataPoints: 50 },
    { label: 'Singapore', value: 4017733, totalDataPoints: 50 },
    { label: 'Ho Chi Minh City', value: 3980000, totalDataPoints: 50 },
    { label: 'Chennai (Madras)', value: 3841396, totalDataPoints: 50 },
    { label: 'Pusan', value: 3804522, totalDataPoints: 50 },
    { label: 'Los Angeles', value: 3694820, totalDataPoints: 50 },
    { label: 'Dhaka', value: 3612850, totalDataPoints: 50 },
    { label: 'Berlin', value: 3386667, totalDataPoints: 50 },
    { label: 'Rangoon (Yangon)', value: 3361700, totalDataPoints: 50 },
    { label: 'Chengdu', value: 3361500, totalDataPoints: 50 },
    { label: 'Jokohama [Yokohama]', value: 3339594, totalDataPoints: 50 },
    { label: 'Alexandria', value: 3328196, totalDataPoints: 50 },
    { label: 'Riyadh', value: 3324000, totalDataPoints: 50 },
    { label: 'Sydney', value: 3276207, totalDataPoints: 50 },
    { label: 'Ankara', value: 3038159, totalDataPoints: 50 },
    { label: 'Buenos Aires', value: 2982146, totalDataPoints: 50 },
    { label: 'Hyderabad', value: 2964638, totalDataPoints: 50 },
    { label: 'Casablanca', value: 2940623, totalDataPoints: 50 },
    { label: 'Chicago', value: 2896016, totalDataPoints: 50 },
  ]

  const x: number[] = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40))
  const y: number[] = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40))
  const dataScatter: DataPoint[] = x.map((i, index) => {
    return {
      x: i,
      y: y[index],
    }
  })

  return {
    dataCities: dataCities,
    dataScatter: dataScatter,
  }
}

/*
 * For more examples see https://iva-git.igd.fraunhofer.de/iva/d3-examples/-/tree/master
 */
export default async function D3Page({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])
  const pageData: D3PageData = await getPageData()

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          Two different kinds of D3 graphs. The bar chart is rendered using svg objects, the multi line chart uses the
          d3 canvas.
        </Typography>
        <BarChartContainer dataCities={pageData.dataCities} />
        <ScatterPlotContainer dataScatter={pageData.dataScatter} />
      </Box>
    </TranslationProvider>
  )
}
