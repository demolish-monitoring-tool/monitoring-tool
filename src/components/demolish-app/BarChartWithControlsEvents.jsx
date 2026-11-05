import React, { useState, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Checkbox, Accordion, AccordionDetails, AccordionSummary, Typography, Container, Stack, Button } from "@mui/material";
import ExpandMoreIcon from "./assets/Double-Alt-Arrow-Down--Streamline-Solar.svg?react";
import DiagramIcon from "./assets/Diagram-Down--Streamline-Solar.svg?react";
import Grid from '@mui/material/Grid';
import { data } from "./data/data";

const rawData = data;

const allKeys = ["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"];

export default function BarChartWithControls() {
    const [selectedVariables, setSelectedVariables] = useState(["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"]);
    const chartRef = useRef(null);

    const handleExportSVG = () => {
        if (chartRef.current) {
            const svgElement = chartRef.current.querySelector('svg');
            if (!svgElement) return;

            const svgClone = svgElement.cloneNode(true);
            const serializer = new XMLSerializer();

            const svgWidth = svgElement.clientWidth || 600;
            const svgHeight = svgElement.clientHeight || 400;

            const caption = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            caption.setAttribute('x', svgWidth / 2);
            caption.setAttribute('y', svgHeight - 0);
            caption.setAttribute('text-anchor', 'middle');
            caption.setAttribute('fill', 'black');
            caption.style.fontSize = '12px';
            caption.textContent = 'This chart was created using the monitoring tool on the www.demolish.gr';

            svgClone.appendChild(caption);

            const svgString = serializer.serializeToString(svgClone);
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const toggleVariable = (variable) => {
        setSelectedVariables((prev) =>
            prev.includes(variable) ? prev.filter((v) => v !== variable) : [...prev, variable]
        );
    };

    return (
        <Container maxWidth="xl" sx={{ marginBottom: "2em", marginTop: "2em" }}>
            <Grid container spacing={2}
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <Grid size={3}>
                    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
                            <div>
                                <DiagramIcon style={{ width: "24px" }} />
                            </div>
                            <div>
                                <Typography variant="h5">Format your chart</Typography>
                            </div>
                        </div>
                        <Accordion defaultExpanded style={{ textAlign: "left", width: "100%" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ width: "24px" }} />}
                                aria-controls="panel-content"
                                id="panel-header"
                                style={{ backgroundColor: "#f2f4fe", color: "#2a2a2a" }}
                            >
                                <Typography component="span" sx={{ fontWeight: "600" }}>
                                    Select Groups
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {allKeys.map((key) => (
                                    <div key={key}>
                                        <Checkbox
                                            checked={selectedVariables.includes(key)}
                                            onChange={() => toggleVariable(key)}
                                            sx={{ color: "#2a2a2a", '&.Mui-checked': { color: "#ff6347" } }}
                                        />
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Grid>
                <Grid size={9}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Typography variant="h5">Annual distribution of retrieved Tweets for each Target Group</Typography>
                        </div>
                        <div>
                            <Button
                                onClick={handleExportSVG}
                                style={{
                                    background: '#f2f4fe',
                                    color: '#ff6347',
                                    fontSize: '14px'
                                }}
                            >
                                Export as SVG
                            </Button>
                        </div>
                    </div>
                    <div ref={chartRef} style={{ height: '700px', position: 'relative' }}>
                        <ResponsiveBar
                            data={rawData}
                            keys={selectedVariables}
                            indexBy="year"
                            groupMode="grouped"
                            margin={{ top: 50, right: 120, bottom: 50, left: 80 }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: '#38bcb2',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: '#eed312',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[
                                {
                                    match: { id: 'Migrants' },
                                    id: 'dots'
                                },
                                {
                                    match: { id: 'Muslims' },
                                    id: 'lines'
                                }
                            ]}
                            borderColor={{
                                from: 'color',
                                modifiers: [
                                    ['darker', 1.6]
                                ]
                            }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'year',
                                legendPosition: 'middle',
                                legendOffset: 32,
                                truncateTickAt: 0
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Number of Tweets',
                                legendPosition: 'middle',
                                legendOffset: -65,
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
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{
                                from: 'color',
                                modifiers: [
                                    ['darker', 1.6]
                                ]
                            }}
                            legends={[
                                {
                                    dataFrom: 'keys',
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 120,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                    symbolSize: 20,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            role="application"
                            ariaLabel="Tweets bar chart demo"
                            barAriaLabel={e => e.id + ": " + e.formattedValue + " in year: " + e.indexValue}
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
