import React from 'react';
import { Box, useTheme } from '@mui/material';
import MuiNextLink from '@/components/MuiNextLink';

export const footerHeight = '40px'

export default function Footer() {

  const theme = useTheme()

  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
      p: 0.5,
      borderTop: '1px solid',
      borderColor: theme.palette.text.secondary,
      width: '100%',
      height: footerHeight,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
    },
  }

  return (
    <Box sx={styles.footer}>
      <MuiNextLink href={'/imprint'} label={'Imprint'} sx={{ mx: 1 }} />
      <MuiNextLink href={'/dsgvo'} label={'DSGVO'} sx={{ mx: 1 }} />
    </Box>
  )
}