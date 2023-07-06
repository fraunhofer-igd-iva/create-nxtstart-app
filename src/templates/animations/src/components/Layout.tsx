import React, { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import Footer, { footerHeight } from './Footer';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Layout({ children }: PropsWithChildren) {

  const router = useRouter()

  return (
    <Box>
      <NavBar />
      <Box sx={{ pb: footerHeight }}>
        <motion.div
          layoutId={router.asPath}
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