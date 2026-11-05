import React, { useState } from "react";
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveFunnel } from '@nivo/funnel';
import { clusterData } from './data/clusterData';

const stepColors = ['#1ca5b2', '#5eb8cb', '#8ec1d7', '#79a3cd', '#5981da'];

const FunnelWithClustering = () => {
    const [yearIndex, setYearIndex] = useState(0);
    const currentYear = clusterData.years[yearIndex];

    return (
        <Container>
            <HeaderText>Select a year to view the data:</HeaderText>
            <Years>
                {clusterData.years.map((yearData, index) => (
                    <YearButton key={yearData.year} onClick={() => setYearIndex(index)}>
                        {yearData.year}
                    </YearButton>
                ))}
            </Years>

            <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: "2em" }}>{currentYear.year}</h2>

            {/* Side-by-side layout for Funnel & Bar Charts */}
            <ChartContainer>
                {/* Bullet Wrapper (left) */}
                <BulletWrapper>
                    <Header>Types of Verbal Attacks</Header>
                    {currentYear.data.map((datum, index) => (
                        <BulletRow key={datum.id}>
                            <Bullet style={{ backgroundColor: stepColors[index] }}>
                                {index + 1}
                            </Bullet>
                            <BulletLabel>{datum.label}</BulletLabel>
                        </BulletRow>
                    ))}
                </BulletWrapper>

                {/* Funnel Chart on the center */}
                <FunnelChartWrapper>
                    <Header>Total Verbal Attacks rate per year</Header>
                    <ResponsiveFunnel
                        data={currentYear.data}
                        margin={{ top: 40, bottom: 40, left: 20, right: 20 }}
                        colors={stepColors}
                        theme={funnelTheme}
                        borderWidth={20}
                        spacing={1}
                        valueFormat={value => value.toFixed(4)}
                        labelColor="#000000"
                        motionConfig="wobbly"
                    />
                </FunnelChartWrapper>

                {/* Bar Charts on the Right */}
                <BarChartsWrapper>
                    <Header>Bar Charts per VA category per group</Header>
                    {currentYear.data.map((datum, index) => (
                        <BarChart key={datum.id}>
                            <Header>{datum.label}</Header>
                            <ResponsiveBar
                                data={datum.byGroup}
                                keys={['value']}
                                indexBy="id"
                                margin={{ top: 10, right: 20, bottom: 80, left: 50 }}
                                colors={[stepColors[index]]}
                                padding={0.3}
                                enableGridY={true}
                                theme={barTheme}
                                axisBottom={{ tickRotation: -45 }}
                                axisLeft={{ tickValues: 5 }}
                                valueFormat={value => value.toFixed(4)}
                                motionConfig="wobbly"
                                labelTextColor="#000000"
                            />
                        </BarChart>
                    ))}
                </BarChartsWrapper>
            </ChartContainer>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    max-width: 1300px;
    margin: auto;
    background-color: #222;
    padding: 24px 32px;
    border-radius: 10px;
`;

const HeaderText = styled.p`
    margin: 0 0 16px;
    font-weight: 400;
    color: #ddd;
    text-align: center;
`;

const Header = styled.h2`
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: #999999;
`

const Years = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-bottom: 12px;
`;

const YearButton = styled.button`
    background-color: #1ca5b2;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    &:hover {
        background-color: #147a84;
    }
`;

/* Flexbox Layout for Side-by-Side Charts */
const ChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-top: 20px;
`;

/* Funnel Chart takes 40% width */
const FunnelChartWrapper = styled.div`
    width: 40%;
    height: 500px;
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
`;

/* Bar Charts take 60% width */
const BarChartsWrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

/* Individual Bar Chart Styling */
const BarChart = styled.div`
    height: 250px;
    background-color: #333;
    padding: 10px;
    border-radius: 10px;
`;


const BulletWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding: 10px;
`;

const BulletRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BulletLabel = styled.p`
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    margin: 0!important;
`;

const Bullet = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
`;


const funnelTheme = {
    labels: {
        text: {
            fontSize: 15,
            fontFamily: `'Consolas', monospace`,
        },
    },
    grid: {
        line: {
            stroke: '#444444',
        },
    },
}

const barTheme = {
    axis: {
        ticks: {
            line: {
                stroke: '#444444',
            },
            text: {
                fill: '#999999',
            },
        },
    },
    grid: {
        line: {
            stroke: '#444444',
        },
    },
}

export default FunnelWithClustering;
