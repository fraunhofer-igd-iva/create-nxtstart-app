'use client'

import { useState, useMemo } from 'react'
import { Button, Box, TextField, Typography } from '@mui/material'
import { authClient } from '@/app/api/auth/[...all]/authClient'
import { useSearchParams } from 'next/navigation'

export default function SignupComponent() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get('callbackUrl') || '/'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // UI feedback
  const [submitting, setSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  // Inline errors
  const [nameError, setNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const isEmailValid = useMemo(() => {
    const trimmed = email.trim()
    return !!trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  }, [email])

  const isPasswordStrongEnough = useMemo(() => {
    // Adjust to your policy as needed
    return password.length >= 8
  }, [password])

  const validateFields = () => {
    let valid = true

    if (!name.trim()) {
      setNameError('Please enter your name.')
      valid = false
    } else {
      setNameError(null)
    }

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
    } else if (!isPasswordStrongEnough) {
      setPasswordError('Use at least 8 characters.')
      valid = false
    } else {
      setPasswordError(null)
    }

    return valid
  }

  const handleEmailSignup = async () => {
    setGlobalError(null)

    // Front-end validation first
    const ok = validateFields()
    if (!ok) return

    setSubmitting(true)
    try {
      const signUpResult = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      })

      if (signUpResult?.error) {
        throw new Error(signUpResult.error?.message || 'Sign-up failed.')
      }

      // Workaround as callback URL for sign up was not working, if fixed => enable auto sign in in auth.ts and remove the following lines
      const signInResult = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL,
      })

      if (signInResult?.error) {
        throw new Error(signInResult.error?.message || 'Sign-in after sign-up failed.')
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Something went wrong during sign-up. Please try again.'
      setGlobalError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box key="email" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError ?? ' '}
        />

        <TextField
          label="Email"
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

        {globalError && (
          <Typography
            variant="body2"
            sx={{ color: 'error.main' }}
            role="alert"
            aria-live="polite"
          >
            {globalError}
          </Typography>
        )}

        <Button
          variant="outlined"
          color="primary"
          onClick={handleEmailSignup}
          disabled={submitting || !name || !email || !password}
        >
          {submitting ? 'Signing up…' : 'Sign up with Email'}
        </Button>
      </Box>
    </Box>
  )
}
