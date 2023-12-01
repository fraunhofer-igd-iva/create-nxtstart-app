'use client'

import { Box, Button } from '@mui/material'
import React from 'react'
import ScatterPlot, { DataPoint } from './ScatterPlot'

interface ScatterPlotProps {
  dataScatter: DataPoint[]
}

export default function ScatterPlotContainer(props: ScatterPlotProps) {
  const [dataScatter, setDataScatter] = React.useState<DataPoint[]>(props.dataScatter)

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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', mt: 4 }}>
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
  )
}
