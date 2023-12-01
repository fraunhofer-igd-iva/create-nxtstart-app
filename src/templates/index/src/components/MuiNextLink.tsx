import React from 'react'
import { Link, SxProps, Theme, useTheme } from '@mui/material'
import NextLink from 'next/link'

interface MuiNextLinkProps {
  href: string
  label: string
  sx?: SxProps<Theme>
  noDecoration?: boolean
  openInNewTab?: boolean
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
        textDecorationColor: props.noDecoration ? 'transparent' : theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.dark,
          textDecorationColor: props.noDecoration ? 'transparent' : theme.palette.primary.dark,
        },
        ...props.sx,
      }}
      target={props.openInNewTab ? '_blank' : undefined}
    >
      {props.label}
    </Link>
  )
}
