import React from 'react';
import Head from 'next/head';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', [
                'common',
            ])),
            // Will be passed to the page component as props
        },
    }
}

export default function DSGVOPage() {

    return (
        <div>
            <Head>
                <title>DSGVO</title>
            </Head>
            DSGVO
        </div>
    )
}
