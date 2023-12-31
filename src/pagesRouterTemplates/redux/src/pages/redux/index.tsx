import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, TextField, Container, Typography, Box, useTheme } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { decrement, increment, incrementByAmount, selectCount } from '@/store/slices/counterSlice'
import MuiNextLink from '@/components/MuiNextLink'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default function ReduxPage() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const theme = useTheme()
  const [incrementAmount, setIncrementAmount] = React.useState<number>(0)

  return (
    <div>
      <Head>
        <title>Redux State Management</title>
      </Head>
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
          <MuiNextLink
            href={'/redux/pageTwo'}
            label={'Link to site accessing this state'}
            sx={{ color: theme.palette.secondary.main, textDecorationColor: theme.palette.secondary.main }}
          />
        </Box>
        <div className={styles.row}>
          <div className={styles.column}>
            <Button variant="outlined" onClick={() => dispatch(increment())}>
              +1
            </Button>
            <Button variant="outlined" onClick={() => dispatch(decrement())}>
              -1
            </Button>
          </div>

          <div className={styles.textColumn}>
            <Typography>current number:</Typography>
            <Typography variant="h2">{count}</Typography>
          </div>

          <div className={styles.column}>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setIncrementAmount(Number(e.target.value))}
            />
            <Button variant="outlined" onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}>
              increment by
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
