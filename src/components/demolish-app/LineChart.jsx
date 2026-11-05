import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import SimpleCloud from "./SimpleCloud";
import { Checkbox, Accordion, AccordionDetails, AccordionSummary, Typography, Container, Stack, Divider , IconButton } from "@mui/material";
import ExpandMoreIcon from "./assets/Double-Alt-Arrow-Down--Streamline-Solar.svg?react";
import DiagramIcon from "./assets/Diagram-Down--Streamline-Solar.svg?react";
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { data } from "./data/data_new";

const allKeys = ["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"];
const allYears = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const allCategories = ["Criticism", "Swearing", "Irony", "Ousting", "Physical Abuse"];

const LineChart = () => {
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelection = (setState, value) => {
        setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    const filteredData = selectedGroups.length > 0 ? selectedGroups.flatMap(group =>
        selectedCategories.map(category => ({
            id: `${group}/${category}`,
            data: selectedYears.map(year => ({
                x: year,
                y: data.data.groups[group]?.[year]?.[category] || 0
            }))
        }))
    ):[];

    return (<Container maxWidth="xl" sx={{ marginBottom: "2em" , marginTop: "2em"}}>
        <Grid container spacing={2}
            sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}
        >
            <Grid size={3}>
                <Stack spacing={2}>
                    <div style={{display: "flex", gap: "0.5em", alignItems: "center"}}>
                        <div>
                            <DiagramIcon style={{ width: "24px" }}/>
                        </div>
                        <div>
                            <Typography variant="h5">Format your chart</Typography>
                        </div>
                    </div>
                    {[{ label: "Select Years", subtitle: "I want to compare results", items: allYears, state: selectedYears, setState: setSelectedYears },
                    { label: "Select Groups", subtitle: "for the target groups", items: allKeys, state: selectedGroups, setState: setSelectedGroups },
                    { label: "Select VA type", subtitle: "and for the verbal aggression types", items: allCategories, state: selectedCategories, setState: setSelectedCategories }]
                        .map(({ label, items, subtitle, state, setState }) => (<>
                            <Typography variant="body2" gutterBottom sx={{textAlign: "left"}}>{subtitle}</Typography>
                            <Accordion defaultExpanded key={label} style={{ textAlign: "left", width: "100%" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon style={{ width: "24px" }} />} aria-controls="panel-content" id="panel-header" style={{ backgroundColor: "#f2f4fe", color: "#2a2a2a" }}>
                                    <Typography component="span" sx={{ fontWeight: "600" }}>{label}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {items.map(item => (
                                        <div key={item}>
                                            <Checkbox checked={state.includes(item)} onChange={() => handleSelection(setState, item)}
                                                sx={{ color: "#2a2a2a", '&.Mui-checked': { color: "#ff6347" } }}
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </>))}
                    {/* Selected Items Display */}
                    <Stack direction="column">
                        {[...selectedYears].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <IconButton size="small" onClick={() => {
                                    if (selectedYears.includes(item)) handleSelection(setSelectedYears, item);
                                }}>
                                    <CloseIcon fontSize="small" style={{color: "#ff6347"}}/>
                                </IconButton>
                                <Typography variant="body2"><span style={{fontWeight: 600}}>Year</span>/<span>{item}</span></Typography>
                            </div>
                        ))}
                    </Stack>
                    {selectedYears.length>0 && <Divider variant="middle" style={{borderColor: "#ced4da"}}/>}
                    <Stack direction="column">
                        {[...selectedGroups].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <IconButton size="small" onClick={() => {
                                    if (selectedGroups.includes(item)) handleSelection(setSelectedGroups, item);
                                }}>
                                    <CloseIcon fontSize="small" style={{ color: "#ff6347" }} />
                                </IconButton>
                                <Typography variant="body2"><span style={{fontWeight: 600}}>Group</span>/<span>{item}</span></Typography>
                            </div>
                        ))}
                    </Stack>
                    {selectedGroups.length > 0 && <Divider variant="middle" style={{ borderColor: "#ced4da" }} />}
                    <Stack direction="column">
                        {[...selectedCategories].map((item) => (
                            <div key={item} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <IconButton size="small" onClick={() => {
                                    if (selectedCategories.includes(item)) handleSelection(setSelectedCategories, item);
                                }}>
                                    <CloseIcon fontSize="small" style={{ color: "#ff6347" }} />
                                </IconButton>
                                <Typography variant="body2"><span style={{fontWeight: 600}}>VA type</span>/<span>{item}</span></Typography>
                            </div>
                        ))}
                    </Stack>
                </Stack>
            </Grid>
            <Grid size={9}>
                {filteredData.length > 0 && <Stack spacing={2}><div style={{ height: "650px" }}>
                    <ResponsiveLine
                        data={filteredData}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, nice: true }}
                        axisBottom={{ tickRotation: -45 }}
                        axisLeft={{ legend: "Rate", legendPosition: "middle", legendOffset: -50 }}
                        colors={{ scheme: "nivo" }}
                        pointSize={8}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        theme={{
                            axis: {
                                legend: {
                                    text: {
                                        fontWeight: 'bold', // Make it bold
                                        letterSpacing: '1.2px',
                                    },
                                },
                            },
                        }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [{ on: "hover", style: { itemOpacity: 0.85 } }]
                            }
                        ]}
                    />
                </div>
                <div>
                <SimpleCloud years={selectedYears} vamTypes={selectedCategories} tgs={selectedGroups}/>
                </div></Stack>}
            </Grid>

        </Grid>
    </Container>
    );
};
export default LineChart;
