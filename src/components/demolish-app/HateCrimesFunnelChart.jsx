import React from "react";
import { ResponsiveFunnel } from '@nivo/funnel';

const data = [
  { id: "Migrants", value: 121, label:"Migrants" },
  { id: "Refugees", value: 57, label:"Refugees"},
  { id: "Pakistanis", value: 19, label:"Pakistanis" },
  { id: "Jews", value: 16, label:"Jews" },
  { id: "Muslims", value: 7, label:"Muslims" },
  { id: "Albanians", value: 7, label:"Albanians" },
];

export default function HateCrimesFunnelChart() {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveFunnel
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.0f"
        colors={{ scheme: 'set1' }}
        borderWidth={20}
        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
      />
    </div>
  );
}
