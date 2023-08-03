import React from 'react'
import { Card, CardContent, Typography, CardActions, Avatar, useTheme } from '@mui/material'
import MuiNextLink from './MuiNextLink'

export interface IndexCardProps {
  imageLink: string
  title: string
  description: string
  hrefDocs: string
  hrefExample: string | undefined
  additionalLinks: { label: string; href: string }[]
}

export default function IndexCard(props: IndexCardProps) {
  const theme = useTheme()

  return (
    <Card sx={{ minWidth: 250, width: 300, m: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Avatar alt={props.title} src={props.imageLink} variant={'square'} />
        <Typography gutterBottom variant={'h5'} component={'div'}>
          {props.title}
        </Typography>
        <Typography variant={'body2'} color={'text.secondary'}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <MuiNextLink href={props.hrefDocs} label={'Docs'} />
        {props.hrefExample && <MuiNextLink href={props.hrefExample} label={'Example'} />}
        {props.additionalLinks.map((aL, index) => {
          const color = aL.href.includes('youtube') ? theme.palette.secondary : theme.palette.primary
          return (
            <MuiNextLink
              key={index}
              href={aL.href}
              label={aL.label}
              sx={{
                color: color.main,
                textDecorationColor: color.light,
                '&:hover': {
                  color: color.dark,
                  textDecorationColor: color.dark,
                },
              }}
            />
          )
        })}
      </CardActions>
    </Card>
  )
}
