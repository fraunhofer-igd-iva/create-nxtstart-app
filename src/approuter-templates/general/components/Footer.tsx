import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const footerHeight = 40 // keep multiple of 8

export default function Footer() {
  const theme = useTheme()
  const { t } = useTranslation()

  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
      p: 0.5,
      borderTop: '1px solid',
      width: '100%',
      height: `${footerHeight}px`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
    },
  }

  return (
    <Box sx={styles.footer}>
      <Box
        sx={{
          mx: 1,
        }}
      >
        <Link href={'/imprint'}>
          <Typography color={theme.palette.primary.main}> {t('imprint')} </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          mx: 1,
        }}
      >
        <Link href={'/privacy'}>
          <Typography color={theme.palette.primary.main}>{t('privacy')}</Typography>
        </Link>
      </Box>
    </Box>
  )
}
