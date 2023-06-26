import React from 'react';
import {Typography, Box, Button} from '@mui/material';
import Head from 'next/head';
import {Data} from '../util/types';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import BarChart from '../components/d3/BarChart';
import {prisma} from '../util/prismaClient';
import MuiNextLink from '../components/MuiNextLink';
import ScatterPlot, {DataPoint} from '../components/d3/ScatterPlot';

interface D3PageProps {
    dataCities: Data[],
    dataScatter: DataPoint[],
}

export async function getStaticProps({ locale }: any) {
    const cities = await prisma.city.findMany({where: {Population: {gte: 1000000}}, orderBy: {Population: 'desc'}, take: 50})
    const dataCities: Data[] = cities.map(c => {
        return {label: c.Name, value: c.Population, totalDataPoints: cities.length}
    })

    const x: number[] = Array.from({length: 40}, () => Math.floor(Math.random() * 40))
    const y: number[] = Array.from({length: 40}, () => Math.floor(Math.random() * 40))
    const dataScatter: DataPoint[] = x.map((i, index) => {
        return {
            x: i,
            y: y[index],
        }
    })

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', [
                'common',
            ])),
            // Will be passed to the page component as props
            dataCities: dataCities,
            dataScatter: dataScatter,
        },
    }
}

/*
 *
 * For more examples see https://iva-git.igd.fraunhofer.de/iva/d3-examples/-/tree/master
 *
 */

export default function D3Page(props: D3PageProps) {

    const [dataCities, setDataCities] = React.useState<Data[]>([])
    const [dataScatter, setDataScatter] = React.useState<DataPoint[]>(props.dataScatter)

    // Server-Side-Rendering seems to conflict with the rotated X labels in the bar chart, therefore a useEffect is used
    React.useEffect(() => {
        setDataCities(props.dataCities)
    }, [props.dataCities])

    const randomCityUpdate = () => {
        const index = Math.floor(Math.random()*dataCities.length)
        const randomValue = Math.floor(Math.random()*10000000)
        setDataCities(prev => {
            prev[index].value = randomValue
            return Array.of(...prev)
        })
    }

    const randomScatterUpdate = () => {
        const index = Math.floor(Math.random()*dataScatter.length)
        const randomValueX = Math.floor(Math.random()*40)
        const randomValueY = Math.floor(Math.random()*40)
        setDataScatter(prev => {
            prev[index] = {
                x: randomValueX,
                y: randomValueY
            }
            return Array.of(...prev)
        })
    }

    return (
        <div>
            <Head>
                <title>D3</title>
            </Head>
            <Box sx={{my: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant={'body1'} maxWidth={350} textAlign={'center'}>
                    Two different kinds of D3 graphs.
                    The bar chart is rendered using svg objects,
                    the multi line chart uses the d3 canvas.
                    To see the updating behaviour of the bar chart see
                </Typography>
                <MuiNextLink href={'/sse'} label={'Server Sent Events'} />
                <Box sx={{display: 'flex', flexDirection: 'row', mt: 4}}>
                    <Button variant={'contained'} onClick={randomCityUpdate} sx={{mx: 2}}>Random Update</Button>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    py: 4,
                }}>
                    <BarChart width={1000} height={500} data={dataCities} />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', mt: 4}}>
                    <Button variant={'contained'} onClick={randomScatterUpdate} sx={{mx: 2}}>Random Update</Button>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    py: 4,
                }}>
                    <ScatterPlot width={500} height={500} data={dataScatter} />
                </Box>
            </Box>
        </div>
    )
}
