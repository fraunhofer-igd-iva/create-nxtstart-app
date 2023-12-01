'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getCounterData, selectCount } from '@/store/slices/counterSlice'
import { Box, Button, Typography } from '@mui/material'

export default function AsyncStateUpdateComponent() {
  // access state using a function
  // const counter = useAppSelector((state) => state.counter.value)
  // or using the custom selector
  const counter = useAppSelector(selectCount)

  const dispatch = useAppDispatch()

  const styles = {
    textColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }

  return (
    <Box sx={styles.textColumn}>
      <Typography>Current counter:</Typography>
      <Typography variant={'h2'}>{counter}</Typography>
      <Button onClick={() => dispatch(getCounterData())}>Update State Async</Button>
    </Box>
  )
}
