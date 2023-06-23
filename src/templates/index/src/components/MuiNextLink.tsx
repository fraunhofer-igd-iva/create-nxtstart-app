import React from 'react';
import {Link, SxProps, Theme} from '@mui/material';
import NextLink from 'next/link';

interface MuiNextLinkProps {
    href: string,
    label: string,
    sx?: SxProps<Theme>,
}

export default function MuiNextLink(props: MuiNextLinkProps) {

    return (
        <Link href={props.href} component={NextLink} sx={props.sx}>
            {props.label}
        </Link>
    )
}
