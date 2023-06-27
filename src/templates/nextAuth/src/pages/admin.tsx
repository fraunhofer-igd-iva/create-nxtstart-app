import React from 'react';
import {Typography, Box} from '@mui/material';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import {getToken} from 'next-auth/jwt';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

interface AdminPageProps {
    isAdmin: boolean,
}

export const getServerSideProps: GetServerSideProps = async ({req, locale}) => {
    const token = await getToken({
        req,
        secret: process.env.SECRET,
    })
    const isAdmin = token ? token.isAdmin : false
    return {
        props: {
            ...(await serverSideTranslations( locale ?? 'en', [
                'common',
            ])),
            isAdmin
        }
    }
}

/**
 * This page can be used to show content restricted by user groups.
 * The group is accesses using the current session that is provided by next auth.
 * This is done server side in the getServerSideProps function and all data should be fetched there as well
 * (or be protected by additional checks in the respective API endpoints if it's fetched in the component).
 */
export default function AdminPage(props: AdminPageProps) {

    return (
        <Box>
            <Head>
                <title>Admin Panel</title>
            </Head>
            <Box sx={{my: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
                    {props.isAdmin ? 'Welcome Admin' : 'Need admin account to see content'}
                </Typography>
            </Box>
        </Box>
    )
}
