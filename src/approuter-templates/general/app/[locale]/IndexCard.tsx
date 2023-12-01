'use client'

import React from 'react'
import { Card, CardContent, Typography, CardActions, Avatar, useTheme } from '@mui/material'
import Link from 'next/link'

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
        <Link href={props.hrefDocs} target={'_blank'}>
          <Typography color={theme.palette.primary.main}> Docs </Typography>
        </Link>
        {props.hrefExample && (
          <Link href={props.hrefExample}>
            <Typography color={theme.palette.primary.main}> Example </Typography>
          </Link>
        )}
        {props.additionalLinks.map((aL, index) => {
          const color = aL.href.includes('youtube') ? theme.palette.secondary.main : theme.palette.primary.main
          return (
            <Link key={index} href={aL.href} target={aL.href.includes('.') ? '_blank' : undefined}>
              <Typography color={color}> {aL.label} </Typography>
            </Link>
          )
        })}
      </CardActions>
    </Card>
  )
}
