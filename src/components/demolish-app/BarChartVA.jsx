import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { data } from "./data/data_new";
import { Checkbox , Container} from "@mui/material";

const allKeys = ["Albanians", "Pakistanis", "Muslims", "Jews", "Migrants", "Refugees"];
const allYears = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const allCategories = ["Criticism", "Swearing", "Irony", "Ousting", "Physical Abuse"];

const BarChartVA = () => {
    const [selectedYears, setSelectedYears] = useState(allYears);
    const [selectedGroups, setSelectedGroups] = useState(allKeys);
    const [selectedCategories, setSelectedCategories] = useState(allCategories);

    const handleSelection = (setState, value) => {
        setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    const filteredData = selectedYears.map(year => {
        let entry = { year };
        selectedGroups.forEach(group => {
            if (data.data.groups[group] && data.data.groups[group][year]) {
                selectedCategories.forEach(category => {
                    entry[`${group} - ${category}`] = data.data.groups[group][year][category] || 0;
                });
            }
        });
        return entry;
    });
    // console.log(filteredData);
    return (<Container>
        <div style={{ height: "600px" }}>
            <div>
                <h4>Select Years</h4>
                {allYears.map(year => (
                    <label key={year}>
                        <Checkbox checked={selectedYears.includes(year)} onChange={() => handleSelection(setSelectedYears, year)} />
                        {year}
                    </label>
                ))}
            </div>

            <div>
                <h4>Select Groups</h4>
                {allKeys.map(group => (
                    <label key={group}>
                        <Checkbox checked={selectedGroups.includes(group)} onChange={() => handleSelection(setSelectedGroups, group)} />
                        {group}
                    </label>
                ))}
            </div>

            <div>
                <h4>Select Categories</h4>
                {allCategories.map(category => (
                    <label key={category}>
                        <Checkbox checked={selectedCategories.includes(category)} onChange={() => handleSelection(setSelectedCategories, category)} />
                        {category}
                    </label>
                ))}
            </div>

            <ResponsiveBar
                data={filteredData}
                keys={filteredData.length ? Object.keys(filteredData[0]).filter(k => k !== "year") : []}
                indexBy="year"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                colors={{ scheme: "nivo" }}
                axisBottom={{ tickRotation: -45 }}
                axisLeft={{ legend: "Rate", legendPosition: "middle", legendOffset: -50 }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 2,
                        symbolSize: 20,
                        effects: [{ on: "hover", style: { itemOpacity: 0.85 } }]
                    }
                ]}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            />
        </div>
    </Container>);
};


export default BarChartVA;
