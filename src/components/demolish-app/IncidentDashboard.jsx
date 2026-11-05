import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import GreeceMap from "./GreeceMap";
import BarChartWithControlsEvents from './BarChartWithControlsEvents';
import EventsMulitpleStatisticsPage from "./EventsMulitpleStatisticsPage";
import EventsChartsCombined from "./EventsChartsCombined";
// import sampleBarData from "./data/eventsPerType_data.json";
// import sampleLineData from "./data/eventSipleLineData.json";
import {
  Box,
  Tabs, Tab
} from "@mui/material";

const allGroups = ["Albanians", "Pakistanis", "Muslims", "Jews", "Refugees"];
const chartTypes = ["Events per TG", "Events statistics", "Events in newspapers", "Map"];

export default function IncidentDashboard() {
  const [selectedChart, setSelectedChart] = useState(0);
  return (
    <Box p={3} sx={{ minHeight: "100vh", paddingBottom: "4em" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid size={12}>
          <Tabs value={selectedChart} onChange={(e, newValue) => setSelectedChart(newValue)}>
            {chartTypes.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Grid>

        {selectedChart === 0 ? (
          <Grid size={12}>
            <EventsChartsCombined />
          </Grid>
        ) : selectedChart === 1 ? (
          <EventsMulitpleStatisticsPage />
        ) : selectedChart === 2 ? (
          <BarChartWithControlsEvents />
        ) : <GreeceMap />}
      </Grid>

    </Box >
  );
}
