import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

export default React.forwardRef(function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
  const onTheRight = { y: 2000 }
  const inTheCenter = { y: 0 }
  const onTheLeft = { y: 2000 }

  const transition = { duration: 0.6, ease: 'easeInOut' }

  return (
    <motion.div
      ref={ref}
      initial={onTheRight}
      animate={inTheCenter}
      exit={onTheLeft}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  )
})