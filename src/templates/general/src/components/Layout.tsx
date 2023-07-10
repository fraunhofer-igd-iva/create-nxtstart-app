import React from 'react';
import NavBar from './NavBar';
import Footer, { footerHeight } from './Footer';
import { Box } from '@mui/material';

interface LayoutProps {
  setActiveTheme: (newMode: 'light' | 'dark') => void,
  children?: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  
  return (
    <Box>
      <NavBar setActiveTheme={props.setActiveTheme} />
      <Box sx={{ pb: footerHeight }}>
        {props.children}
      </Box>
      <Footer />
    </Box>
  )
}