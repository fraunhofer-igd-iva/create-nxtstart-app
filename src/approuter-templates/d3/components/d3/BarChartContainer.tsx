'use client'

import { Data } from '@/util/types'
import { Box, Button } from '@mui/material'
import React from 'react'
import BarChart from './BarChart'

interface BarChartProps {
  dataCities: Data[]
}

export default function BarChartContainer(props: BarChartProps) {
  const [dataCities, setDataCities] = React.useState<Data[]>([])

  // Server-Side-Rendering seems to conflict with the rotated X labels in the bar chart, therefore a useEffect is used
  React.useEffect(() => {
    setDataCities(props.dataCities)
  }, [props.dataCities])

  const randomBarUpdate = () => {
    const index = Math.floor(Math.random() * dataCities.length)
    const randomValue = Math.floor(Math.random() * 10000000)
    setDataCities((prev) => {
      prev[index].value = randomValue
      return Array.of(...prev)
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', mt: 4 }}>
        <Button variant={'contained'} onClick={randomBarUpdate} sx={{ mx: 2 }}>
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
    </Box>
  )
}
