import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { stackedData } from "./data/stackedData";

const GroupByNewspaperStacked = () => (
  <div style={{ height: 600 }}>
    <ResponsiveBar
      data={stackedData}
      keys={[
        "Albanians",
        "Pakistanis",
        "Muslims",
        "Jews",
        "Migrants",
        "Refugees",
      ]}
      indexBy="newspaper"
      margin={{ top: 50, right: 140, bottom: 80, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set3" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisBottom={{
        tickRotation: -45,
        legend: "Newspaper",
        legendPosition: "middle",
        legendOffset: 60,
      }}
      axisLeft={{
        legend: "Number of Articles",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 4,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: 16,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Stacked bar chart showing article counts by newspaper and category"
      enableLabel={false}
    />
  </div>
);
export default GroupByNewspaperStacked;