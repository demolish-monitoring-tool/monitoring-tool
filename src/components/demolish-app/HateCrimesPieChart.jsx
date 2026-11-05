import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "2015", value: 23 },
  { id: "2016", value: 25 },
  { id: "2017", value: 28 },
  { id: "2018", value: 44 },
  { id: "2019", value: 33 },
  { id: "2020", value: 33 },
  { id: "2021", value: 16 },
  { id: "2022", value: 25 },
];

export default function HateCrimesPieChart() {
  return (
    <div style={{ height: 500 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.4}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
}
