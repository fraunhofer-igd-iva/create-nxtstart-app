import React from 'react'
import { Link, SxProps, Theme, useTheme } from '@mui/material'
import NextLink from 'next/link'

interface MuiNextLinkProps {
  href: string
  label: string
  sx?: SxProps<Theme>
}

// link component combining next link functionality with mui design
export default function MuiNextLink(props: MuiNextLinkProps) {
  const theme = useTheme()

  return (
    <Link 
      href={props.href} 
      component={NextLink} 
      sx={{
        color: theme.palette.primary.main,
        textDecorationColor: theme.palette.primary.light,
        '&:hover': {
          color: theme.palette.primary.dark,
          textDecorationColor: theme.palette.primary.dark,
        }, 
        ...props.sx,
      }}
    >
      {props.label}
    </Link>
  )
}
