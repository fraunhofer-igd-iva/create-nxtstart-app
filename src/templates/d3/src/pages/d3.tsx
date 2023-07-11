import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import Head from 'next/head'
import { Data } from '@/util/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BarChart from '@/components/d3/BarChart'
import ScatterPlot, { DataPoint } from '@/components/d3/ScatterPlot'
import { GetStaticPropsContext } from 'next'

interface D3PageProps {
  dataCities: Data[]
  dataScatter: DataPoint[]
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
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
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      // Will be passed to the page component as props
      dataCities: dataCities,
      dataScatter: dataScatter,
    },
  }
}

/*
 *
 * For more examples see https://iva-git.igd.fraunhofer.de/iva/d3-examples/-/tree/master
 *
 */

export default function D3Page(props: D3PageProps) {
  const [dataCities, setDataCities] = React.useState<Data[]>([])
  const [dataScatter, setDataScatter] = React.useState<DataPoint[]>(props.dataScatter)

  // Server-Side-Rendering seems to conflict with the rotated X labels in the bar chart, therefore a useEffect is used
  React.useEffect(() => {
    setDataCities(props.dataCities)
  }, [props.dataCities])

  const randomCityUpdate = () => {
    const index = Math.floor(Math.random() * dataCities.length)
    const randomValue = Math.floor(Math.random() * 10000000)
    setDataCities((prev) => {
      prev[index].value = randomValue
      return Array.of(...prev)
    })
  }

  const randomScatterUpdate = () => {
    const index = Math.floor(Math.random() * dataScatter.length)
    const randomValueX = Math.floor(Math.random() * 40)
    const randomValueY = Math.floor(Math.random() * 40)
    setDataScatter((prev) => {
      prev[index] = {
        x: randomValueX,
        y: randomValueY,
      }
      return Array.of(...prev)
    })
  }

  return (
    <div>
      <Head>
        <title>D3</title>
      </Head>
      <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          Two different kinds of D3 graphs. The bar chart is rendered using svg objects, the multi line chart uses the
          d3 canvas.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
          <Button variant={'contained'} onClick={randomCityUpdate} sx={{ mx: 2 }}>
            Random Update
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <BarChart width={1000} height={500} data={dataCities} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
          <Button variant={'contained'} onClick={randomScatterUpdate} sx={{ mx: 2 }}>
            Random Update
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <ScatterPlot width={500} height={500} data={dataScatter} />
        </Box>
      </Box>
    </div>
  )
}
