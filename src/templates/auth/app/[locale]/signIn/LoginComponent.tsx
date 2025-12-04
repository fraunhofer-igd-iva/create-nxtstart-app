'use client'

import { useState } from 'react'
import { Button, Box, TextField, Divider } from '@mui/material'
import { authClient } from '@/app/api/auth/[...all]/authClient'
import { useSearchParams } from 'next/navigation'

const providers = ['email', 'github']

export default function LoginComponent() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailLogin = async () => {
    await authClient.signIn.email({ email: email.trim(), password, callbackURL })
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {providers.map((provider) => {
        if (provider === "email") {
          return (
            <Box key="email" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                label="E-Mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEmailLogin}
              >
                Sign in with Email
              </Button>
              <Divider sx={{ width: '100%', my: 2 }} />
            </Box>
          )
        }

        return (
          <Button
            key={provider}
            variant="contained"
            color="primary"
            onClick={async () => await authClient.signIn.social({provider, callbackURL})}
          >
            Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Button>
        )
      })}
    </Box>
  )
}
