import React, { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import Footer, { footerHeight } from './Footer';
import { Box } from '@mui/material';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      <NavBar />
      <Box sx={{ pb: footerHeight }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}