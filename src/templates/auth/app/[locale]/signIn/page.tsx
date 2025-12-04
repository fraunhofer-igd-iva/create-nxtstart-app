import { Container } from '@mui/material'
import AuthToggle from './AuthToggle'

export default async function SignInPage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <AuthToggle />
    </Container>
  )
}
