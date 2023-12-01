import { getInitColorSchemeScript } from '@mui/material/styles'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-color-scheme="dark">
      <Head />
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
