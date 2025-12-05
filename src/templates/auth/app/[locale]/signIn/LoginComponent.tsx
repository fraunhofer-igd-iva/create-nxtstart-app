'use client'

import { useState, useMemo } from 'react'
import { Button, Box, TextField, Divider, Typography } from '@mui/material'
import { authClient } from '@/app/api/auth/[...all]/authClient'
import { useSearchParams } from 'next/navigation'

const providers = ['email', 'github']

export default function LoginComponent() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // UI feedback
  const [submitting, setSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  // Inline errors
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const isEmailValid = useMemo(() => {
    const trimmed = email.trim()
    return !!trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  }, [email])

  const validateFields = () => {
    let valid = true

    if (!email.trim()) {
      setEmailError('Email is required.')
      valid = false
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid email address.')
      valid = false
    } else {
      setEmailError(null)
    }

    if (!password) {
      setPasswordError('Password is required.')
      valid = false
    } else {
      setPasswordError(null)
    }

    return valid
  }

  const handleEmailLogin = async () => {
    setGlobalError(null)

    // Front-end validation first
    const ok = validateFields()
    if (!ok) return

    setSubmitting(true)
    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL,
      })

      if (result?.error) {
        throw new Error(result.error?.message || 'Sign-in failed.')
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Something went wrong during sign-in. Please try again.'
      setGlobalError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {providers.map((provider) => {
        if (provider === 'email') {
          return (
            <Box key="email" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label="E-Mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError ?? ' '}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError ?? ' '}
              />

              {/* Plain text error message above the button for visibility */}
              {globalError && (
                <Typography
                  variant="body2"
                  sx={{ color: 'error.main', mt: 1 }}
                  role="alert"
                  aria-live="polite"
                >
                  {globalError}
                </Typography>
              )}

              <Button
                variant="outlined"
                color="primary"
                onClick={handleEmailLogin}
                disabled={submitting || !email || !password}
              >
                {submitting ? 'Signing in…' : 'Sign in with Email'}
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
            onClick={async () => {
              // Optional: you could set submitting state if you want to disable all buttons during social auth
              await authClient.signIn.social({ provider, callbackURL })
            }}
          >
            Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Button>
        )
      })}
    </Box>
  )
}
