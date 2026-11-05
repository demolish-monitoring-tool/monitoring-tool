import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsivePie } from '@nivo/pie';
import { Typography, Container, Card, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid';
import { data } from "./data/va_type_rate_per_tg";
import data_tg from "./data/data_tg_overall.json";
import data_pie from "./data/VA_rate_per_TG_pie.json";
import data_rate_year from "./data/VA_rate_per_year.json";

// const allYears = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const allCategories = ["Criticism", "Swearing", "Irony", "Ousting", "Physical Abuse"];

const formattedData = data_rate_year.map(series => ({
    ...series,
    data: series.data.map(point => ({
        ...point,
        y: parseFloat(point.y.toFixed(3)) // Round to 3 decimal places
    }))
}));
const rawData = data;
const allKeys = ["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"];

export default function VARateStatistics() {
    return (
        <Container maxWidth="xl" sx={{ marginBottom: "2em", marginTop: "2em" }}>
            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
                {/* <Grid container size={12} spacing={4}>
                    <Grid size={9} style={{ display: "flex" }}>
                        <Card style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", width: "100%" }} className="box--main">
                            <CardContent>
                                <Typography variant="h5" style={{ textAlign: 'center', width: '100%' }}>Overall VA rate per year</Typography>
                                <div style={{ height: 500 }}>
                                    <ResponsiveBump
                                        data={formattedData}
                                        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                                        spacing={8}
                                        colors={{ scheme: 'spectral' }}
                                        blendMode="multiply"
                                        endLabel="id"
                                        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                                        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                                        theme={{ fontSize: 14 }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h6">Overall VA rate per year</Typography>
                        <Typography variant="p">explain VA rate here</Typography>
                    </Grid>
                </Grid> */}

                <Grid container size={12} spacing={4}>
                    <Grid size={9} style={{ display: "flex" }}>
                        <Card style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", width: "100%" }} className="box--main">
                            <CardContent>
                                <Typography variant="h5" style={{ textAlign: 'center', width: '100%' }}>Overall VA rate per TG</Typography>
                                <div style={{ height: 500 }}>
                                    <ResponsivePie
                                        data={data_pie}
                                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                        colors={{ scheme: 'nivo' }}
                                        innerRadius={0.5}
                                        padAngle={0.7}
                                        valueFormat={value => value.toFixed(3)}
                                        cornerRadius={3}
                                        activeOuterRadiusOffset={8}
                                        borderWidth={1}
                                        borderColor={{
                                            from: 'color',
                                            modifiers: [
                                                [
                                                    'darker',
                                                    0.2
                                                ]
                                            ]
                                        }}
                                        arcLinkLabelsSkipAngle={10}
                                        arcLinkLabelsTextColor="#333333"
                                        arcLinkLabelsThickness={2}
                                        arcLinkLabelsColor={{ from: 'color' }}
                                        arcLabelsSkipAngle={10}
                                        arcLabelsTextColor={{
                                            from: 'color',
                                            modifiers: [
                                                [
                                                    'darker',
                                                    2
                                                ]
                                            ]
                                        }}
                                        defs={[
                                            {
                                                id: 'dots',
                                                type: 'patternDots',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                size: 4,
                                                padding: 1,
                                                stagger: true
                                            },
                                            {
                                                id: 'lines',
                                                type: 'patternLines',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                rotation: -45,
                                                lineWidth: 6,
                                                spacing: 10
                                            }
                                        ]}
                                        fill={[
                                            { match: { id: 'ruby' }, id: 'dots' },
                                            { match: { id: 'c' }, id: 'dots' },
                                            { match: { id: 'go' }, id: 'dots' },
                                            { match: { id: 'python' }, id: 'dots' },
                                            { match: { id: 'scala' }, id: 'lines' },
                                            { match: { id: 'lisp' }, id: 'lines' },
                                            { match: { id: 'elixir' }, id: 'lines' },
                                            { match: { id: 'javascript' }, id: 'lines' }
                                        ]}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'row',
                                                justify: false,
                                                translateX: 0,
                                                translateY: 56,
                                                itemsSpacing: 0,
                                                itemWidth: 100,
                                                itemHeight: 18,
                                                itemTextColor: '#999',
                                                itemDirection: 'left-to-right',
                                                itemOpacity: 1,
                                                symbolSize: 18,
                                                symbolShape: 'circle',
                                                effects: [
                                                    {
                                                        on: 'hover',
                                                        style: {
                                                            itemTextColor: '#000'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="caption">
                            Migrants, Muslims and Pakistanis are the main targets of Twitter verbal attacks for the whole period under examination. Our results suggest that groups framed as migrants are more likely to be verbally attacked than those framed as refugees, likely due to the differing connotations and sociopolitical implications associated with these two lexicalizations. The per year VA rates indicate a global increase of attacks from 2018 onwards. The increased rate of the attacks against migrants can be possibly attributed to the ongoing refugee crisis and mainly to the fact that the effect of this crisis has started to be tangible in Greek society, especially at the severely overcrowded camps on the islands.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container size={12} spacing={4}>
                    <Card style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", width: "100%" }} className="box--main">
                        <CardContent>
                            <Typography variant="h5" style={{ textAlign: 'center', width: '100%' }}>Overall VA rate per year and TG</Typography>
                            <div style={{ height: 500 }}>
                                <ResponsiveAreaBump
                                    data={data_tg}
                                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                                    spacing={8}
                                    colors={{ scheme: 'category10' }}
                                    blendMode="multiply"
                                    startLabel="id"
                                    endLabel="id"
                                    axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                                    axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                                    theme={{ fontSize: 14 }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid container size={12} spacing={4}>
                    <Grid size={12} style={{ display: "flex" }}>
                        <Card style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", width: "100%" }} className="box--main">
                            <CardContent>
                                <Typography variant="h5" style={{ textAlign: 'center', width: '100%' }}>Overall VA type rates per TG</Typography>
                                <div style={{ height: 500 }}>
                                    <ResponsiveBar
                                        data={rawData}
                                        keys={allKeys}
                                        enableLabel={false}
                                        indexBy="VAtype"
                                        groupMode="grouped"
                                        labelSkipWidth={12}
                                        labelSkipHeight={12}
                                        legends={[
                                            {
                                                dataFrom: 'keys',
                                                anchor: 'bottom-right',
                                                direction: 'column',
                                                translateX: 120,
                                                itemsSpacing: 3,
                                                itemWidth: 100,
                                                itemHeight: 16
                                            }
                                        ]}
                                        axisBottom={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'VA type',
                                            legendPosition: 'middle',
                                            legendOffset: 32,
                                            truncateTickAt: 0
                                        }}
                                        axisLeft={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'TG',
                                            legendPosition: 'middle',
                                            legendOffset: -35,
                                            truncateTickAt: 0
                                        }}
                                        theme={{
                                            axis: {
                                                legend: {
                                                    text: {
                                                        fontWeight: 'bold',
                                                    },
                                                },
                                            },
                                        }}
                                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1">
                            Verbal attacks expressing criticism constitute the main type of VA detected in our datasets, and are mostly directed against Muslims, Jews, Albanians and refugees. Pakistanis and migrants receive the most obscene messages. Pakistanis are mostly evaluated as inferior beings with derogatory morphological variations of their nationality name. The main recipients of ironic tweets are Pakistanis, Jews and refugees. Calls for ousting constitute the third most frequent type of VA targeting mostly Pakistanis and migrants. Pakistanis are also the main targets of messages calling for physical violence.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
