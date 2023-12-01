'use client'

import { Box, Button } from '@mui/material'
import submit from './ServerAction'

export default function ClientComponent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      Client Component
      <Button variant={'contained'} onClick={() => submit(new Date().getTime())}>
        Execute Server Action
      </Button>
    </Box>
  )
}
