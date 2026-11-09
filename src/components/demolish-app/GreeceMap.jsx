import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Button, Box, FormControl, Select, MenuItem, Stack, InputLabel } from "@mui/material";
import events from "./data/events.json";

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const geoUrl = `${baseUrl}/maps/gadm41_GRC_3.json`;

const GreeceMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [zoom, setZoom] = useState(1);
  // Get unique options
  const groups = useMemo(() => ["All", ...new Set(events.map((e) => e.group))], [events]);
  const years = useMemo(() => ["All", ...new Set(events.map((e) => new Date(e.date).getFullYear()))], [events]);
  const types = useMemo(() => ["All", ...new Set(events.map((e) => e.eventType))], [events]);

  // Filtered + Aggregated
  /* const dataForMap = useMemo(() => {
    const filtered = events.filter((e) =>
      (selectedGroup === "All" || e.group === selectedGroup) &&
      (selectedYear === "All" || new Date(e.date).getFullYear() === selectedYear) &&
      (selectedType === "All" || e.eventType === selectedType)
    );

    const counts = {};
    filtered.forEach(({ city }) => {
      counts[city] = (counts[city] || 0) + 1;
    });
    console.log("Aggregated City Counts:", counts);
    return Object.entries(counts).map(([id, value]) => ({ id, value }));
  }, [events, selectedGroup, selectedYear, selectedType]); */
  const dataByCity = useMemo(() => {
    const map = {};

    events
      .filter((e) =>
        (selectedGroup === "All" || e.group === selectedGroup) &&
        (selectedYear === "All" || new Date(e.date).getFullYear() === selectedYear) &&
        (selectedType === "All" || e.eventType === selectedType)
      )
      .forEach((e) => {
        const city = e.city;
        if (!city) return;

        const year = new Date(e.date).getFullYear();
        const eventType = e.eventType;

        if (!map[city]) {
          map[city] = {
            total: 0,
            byYear: {},
            byType: {},
          };
        }

        map[city].total += 1;
        map[city].byYear[year] = (map[city].byYear[year] || 0) + 1;
        map[city].byType[eventType] = (map[city].byType[eventType] || 0) + 1;
      });

    return map;
  }, [events, selectedGroup, selectedYear, selectedType]);


  const cityValueMap = useMemo(() => {
    return new Map(
      Object.entries(dataByCity).map(([city, data]) => [city, data.total])
    );
  }, [dataByCity]);

  // City-value lookup
  // const cityValueMap = useMemo(() => new Map(dataForMap.map((d) => [d.id, d.value])), [dataForMap]);

  const maxValue = useMemo(() => {
    const values = Object.values(dataByCity).map((d) => d.total);
    return Math.max(...values, 0);
  }, [dataByCity]);
  const colorScale = scaleLinear().domain([0, maxValue || 1]).range(["#e0f3f3", "#0077b6"]);

  return (
    <Box p={2}>
      {/* Filter UI */}
      <Stack direction="row" spacing={2} mb={2} sx={{ justifyContent: "space-between" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Group</InputLabel>
          <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} label="Group">
            {groups.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} label="Year">
            {years.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Type</InputLabel>
          <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} label="Type">
            {types.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Map */}
      <Box position="relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [23.7, 38.0]
          }}
          style={{ width: "100%", height: "600px" }}
        >
          <ZoomableGroup
            center={[23.7, 38.0]} // Greece
            zoom={zoom}
            onMoveEnd={({ zoom }) => setZoom(zoom)}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.NAME_3;
                  const value = cityValueMap.get(name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={value != null ? colorScale(value) : "#eee"}
                      stroke="#333"
                      strokeWidth={0.3}
                      onMouseEnter={() => {
                        const cityData = dataByCity[name];
                        if (!cityData) {
                          setTooltipContent(<div>{name}: No data</div>);
                          return;
                        } else {
                          setTooltipContent(
                            <Box>
                              <strong>{name}</strong>
                              <div>Total: {cityData.total}</div>
                              <div><strong>By Year:</strong></div>
                              <ul>
                                {Object.entries(cityData.byYear).map(([year, count]) => (
                                  <li key={year}>{year}: {count}</li>
                                ))}
                              </ul>
                              <div><strong>By Type:</strong></div>
                              <ul>
                                {Object.entries(cityData.byType).map(([type, count]) => (
                                  <li key={type}>{type}: {count}</li>
                                ))}
                              </ul>
                            </Box>
                          );
                          return;
                        }

                        const byYearStr = Object.entries(cityData.byYear)
                          .map(([year, count]) => `${year}: ${count}`)
                          .join(", ");

                        const byTypeStr = Object.entries(cityData.byType)
                          .map(([type, count]) => `${type}: ${count}`)
                          .join(", ");

                        setTooltipContent(
                          `${name}\nTotal: ${cityData.total}\nYears: ${byYearStr}\nTypes: ${byTypeStr}`
                        );
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#ffb703", outline: "none" },
                        pressed: { fill: "#fb8500", outline: "none" }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltipContent && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              zIndex: 10,
              maxWidth: "300px",
              whiteSpace: "pre-wrap"
            }}
          >
            {tooltipContent}
          </Box>
        )}
      </Box>
      <Stack direction="row" spacing={2} mb={2} sx={{ justifyContent: "flex-end" }}>
        <Button onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}>Zoom In</Button>
        <Button onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}>Zoom Out</Button>
      </Stack>
    </Box>
  );
};

export default GreeceMap;
