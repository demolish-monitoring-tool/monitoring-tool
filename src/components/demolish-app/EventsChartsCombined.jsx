import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from "./assets/Double-Alt-Arrow-Down--Streamline-Solar.svg?react";
import DiagramIcon from "./assets/Diagram-Down--Streamline-Solar.svg?react";
import sampleBarData from "./data/eventsPerType_data.json";
import sampleLineData from "./data/eventSipleLineData.json";
import {
    Typography,
    FormGroup,
    Container,
    FormControlLabel,
    Checkbox,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

const allGroups = ["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"];

export default function EventsChartsCombined() {
    const [selectedGroups, setSelectedGroups] = useState(new Set(allGroups));

    const handleGroupToggle = (group) => {
        setSelectedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(group)) {
                next.delete(group);
            } else {
                next.add(group);
            }
            return next;
        });
    };

    const lineData = Array.from(selectedGroups).map((group) => ({
        id: group,
        data: sampleLineData[group] || []
    }));

    const barData = sampleBarData.filter((entry) => selectedGroups.has(entry.group));

    return (
        <Container maxWidth="xl" sx={{ marginBottom: "2em", marginTop: "2em" }}>
            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
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
                                <FormGroup>
                                    {allGroups.map((group) => (
                                        <FormControlLabel
                                            key={group}
                                            control={
                                                <Checkbox
                                                    checked={selectedGroups.has(group)}
                                                    onChange={() => handleGroupToggle(group)}
                                                    sx={{ color: "#2a2a2a", '&.Mui-checked': { color: "#ff6347" } }}
                                                />
                                            }
                                            label={group}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Grid>
                <Grid size={9}>
                    <div style={{ height: '500px', position: 'relative', marginBottom: '2em' }}>
                        <ResponsiveBar
                            data={barData}
                            keys={[
                                "VerbalAttack",
                                "Assault",
                                "ViolentAssault",
                                "AssaultLife",
                                "PropertyAttack",
                                "PropertyGeneral",
                                "ReligiousAttack",
                                "SexualAssault"
                            ]}
                            indexBy="group"
                            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                            padding={0.3}
                            axisBottom={{ legend: "Target Group", legendPosition: "middle", legendOffset: 32 }}
                            axisLeft={{ legend: "Count", legendPosition: "middle", legendOffset: -40 }}
                            colors={{ scheme: "nivo" }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                        />
                    </div>
                    <div style={{ height: '500px', position: 'relative', marginBottom: '2em' }}>
                        <ResponsiveLine
                            data={lineData}
                            margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                            xScale={{ type: "point" }}
                            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                            axisBottom={{ legend: "Year", legendPosition: "middle", legendOffset: 32 }}
                            axisLeft={{ legend: "Incidents", legendPosition: "middle", legendOffset: -40 }}
                            colors={{ scheme: "category10" }}
                            pointSize={10}
                            useMesh={true}
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}
