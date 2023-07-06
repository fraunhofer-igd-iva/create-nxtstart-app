import React, { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import Footer, { footerHeight } from './Footer';
import { Box } from '@mui/material';
import PageTransition from '../components/PageTransition';

export default React.forwardRef(function Layout({ children }: PropsWithChildren, ref: React.ForwardedRef<HTMLDivElement>) {

  return (
    <Box>
      <NavBar />
      <Box sx={{ pb: footerHeight }}>
        <PageTransition ref={ref}>
          {children}
        </PageTransition>
      </Box>
      <Footer />
    </Box>
  )
})