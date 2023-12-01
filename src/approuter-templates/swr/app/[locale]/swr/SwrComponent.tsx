'use client'

import { Box, CircularProgress, Typography } from '@mui/material'
import useSWR from 'swr'

export default function SwrComponent() {
  // change the fetcher according to the data that is provided by the api, in this case json
  // revalidate every hour, all fetches are cached by default in nextjs
  const fetcher = (input: RequestInfo | URL) => fetch(input, { next: { revalidate: 3600 } }).then((res) => res.json())
  // use the provided variables to render the page according to the fetching status
  const { data, error, isLoading } = useSWR('/api/hello?name=John Doe', fetcher)

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && (
        <Typography variant={'h5'} color={'secondary'}>
          Error loading data.
        </Typography>
      )}
      {data && (
        <Typography variant={'h5'} color={'primary'}>
          Welcome back, {data.name}.
        </Typography>
      )}
    </Box>
  )
}
