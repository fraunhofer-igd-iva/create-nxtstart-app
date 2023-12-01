'use client'

import React from 'react'
import { Button, Typography, TextField } from '@mui/material'
import styles from './Redux.module.css'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { decrement, increment, incrementByAmount, selectCount } from '@/store/slices/counterSlice'

export default function StateComponent() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = React.useState<number>(0)

  return (
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
  )
}
