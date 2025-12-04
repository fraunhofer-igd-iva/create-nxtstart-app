'use client'

import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import LoginComponent from './LoginComponent'
import SignupComponent from './SignupComponent'

export default function AuthToggle() {
  const [tab, setTab] = useState(0)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant='fullWidth'
        aria-label='auth tabs'
      >
        <Tab label='Sign In' />
        <Tab label='Sign Up' />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <LoginComponent />
        )}
        {tab === 1 && (
          <SignupComponent />
        )}
      </Box>
    </Box>
  )
}
