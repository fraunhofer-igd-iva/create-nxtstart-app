import React, { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import Footer, { footerHeight } from './Footer';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      <NavBar />
      <Box sx={{ pb: footerHeight }}>
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      </Box>
      <Footer />
    </Box>
  )
}