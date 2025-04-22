'use client'

import React from 'react'
import { Paper, Grid, Typography, styled, useColorScheme } from '@mui/material'
import Image from 'next/image'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function MuiGridItem() {
  const { mode } = useColorScheme()

  // checkout https://mui.com/material-ui/react-grid/ for detailed grid examples and documentation
  return (
    <Paper sx={{ padding: 2, maxWidth: '100dvw', backgroundColor: 'grey.300' }}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} maxWidth={'100dvw'}>
        <Grid size={{ xs: 12 }}>
          <Item>
            <Typography variant={'h5'}>Title &quot;Lorem ipsum dolor sit amet&quot;</Typography>
          </Item>
        </Grid>
        <Grid size={{ lg: 12, xl: 5 }} container spacing={2} direction={'column'}>
          <Grid>
            <Item>
              <Typography variant={'h5'}>Image Title</Typography>
            </Item>
          </Grid>
          <Grid>
            <Item>
              <Image
                alt={'image'}
                src={mode === 'light' ? '/vercel.svg' : '/vercelLight.svg'}
                width={288}
                height={64}
                style={{ width: '288', height: '64' }}
              />
            </Item>
          </Grid>
        </Grid>
        <Grid size={{ lg: 12, xl: 7 }}>
          <Item>
            <Typography>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
              gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Paper>
  )
}
