'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

export default function ClientSideAuth() {
  const [secretData, setSecretData] = React.useState(undefined)
  const { data: session } = useSession()
  React.useEffect(() => {
    // if you have SWR installed for fetching, rather use that instead of the default fetch api in this case
    const fetchData = async () => {
      const res = await fetch('/api/restrictedRoute', {
        cache: 'no-cache',
        method: 'GET',
      })
      const sessionData = await res.json()
      sessionData.content ? setSecretData(sessionData.content) : setSecretData(sessionData.error)
    }

    fetchData()
  }, [])

  return (
    <Box>
      <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
        {secretData}
      </Typography>
      {session && session.user && (
        <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
          {session?.user?.name}
        </Typography>
      )}
    </Box>
  )
}
