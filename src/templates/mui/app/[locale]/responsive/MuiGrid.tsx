'use client'

import React from 'react'
import { Grid2 } from '@mui/material'
import MuiGridItem from './MuiGridItem'

export default function MuiGrid() {
  // checkout https://mui.com/material-ui/react-grid/ for detailed grid examples and documentation
  return (
    <Grid2 container spacing={2} alignItems={'center'}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
        return (
          <Grid2 key={number} size={{ md: 6 }}>
            <MuiGridItem />
          </Grid2>
        )
      })}
    </Grid2>
  )
}
