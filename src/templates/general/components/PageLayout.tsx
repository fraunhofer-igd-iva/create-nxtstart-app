'use client'

import React from 'react'
import NavBar from './NavBar'
import Footer, { footerHeight } from './Footer'
import { Box, useTheme } from '@mui/material'
<§animations§>import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'</§animations§>

interface PageLayoutProps {
  children?: React.ReactNode
}

export default function PageLayout(props: PageLayoutProps) {
  const theme = useTheme()
  <§animations§>const pathname = usePathname()

  // content slides in from bottom on page change
  const variants = {
    hidden: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  }
  </§animations§>
  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          p: theme.spacing(2),
          pb: theme.spacing(2 + footerHeight / 8), // add the footer height in spacing units to bottom padding, 1 spacing unit == 8px
        }}
      >
        <§animations§><motion.main
          key={pathname}
          variants={variants} // Pass the variant object into Framer Motion
          initial={'hidden'} // Set the initial state to variants.hidden
          animate={'enter'} // Animated state to variants.enter
          exit={'exit'} // Exit state (used later) to variants.exit
          transition={{ type: 'tween' }} // Set the transition to tween
          style={{ width: '100%' }}
        ></§animations§>
          {props.children}
          <§animations§></motion.main></§animations§>
      </Box>
      <Footer />
    </Box>
  )
}
