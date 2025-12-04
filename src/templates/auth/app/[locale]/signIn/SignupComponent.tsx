'use client'

import { useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import { authClient } from '@/app/api/auth/[...all]/authClient'
import { useSearchParams } from 'next/navigation'

export default function SignupComponent() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackUrl') || '/'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailSignup = async () => {
    await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
    // workaround as callback URL for sign up was not working, if fixed => enable auto sign in in auth.ts and remove the following line
    await authClient.signIn.email({ email: email.trim(), password, callbackURL })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box key='email' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          label='Name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label='Email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='outlined'
          color='primary'
          onClick={handleEmailSignup}
          disabled={!name || !email || !password}
        >
          Sign up with Email
        </Button>
      </Box>
    </Box>
  )
}
