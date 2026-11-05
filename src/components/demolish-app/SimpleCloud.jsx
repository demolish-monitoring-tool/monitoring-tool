import React from "react";
import { TagCloud } from 'react-tagcloud';
import { Container } from "@mui/material";

import TG1 from "./data/tag_cloud_TG1_Albanians_final.json" ;
import TG2 from "./data/tag_cloud_TG2_Pakistanis_final.json";
import TG3 from "./data/tag_cloud_TG3_Muslims_final.json";
import TG4 from "./data/tag_cloud_TG4_Jews_final.json";
import TG5 from "./data/tag_cloud_TG5_Migrants_final.json" ;
import TG6 from "./data/tag_cloud_TG6_Refugees_final.json";

const dataSources = { TG1, TG2, TG3, TG4, TG5, TG6 };
const dataSourcesKeys = ["TG1", "TG2", "TG3", "TG4", "TG5", "TG6"];
const keyToDataSourceMap = {
  "Albanians": "TG1",
  "Pakistanis": "TG2",
  "Muslims": "TG3",
  "Jews": "TG4",
  "Migrants": "TG5",
  "Refugees": "TG6"
};

const getDataSourcesForKeys = (keysArray) => {
  return keysArray.map(key => keyToDataSourceMap[key]).filter(Boolean); // Maps keys to TGs and removes invalid inputs
};

const mergeAndCountTags = (selectedYears, selectedVamTypes, selectedTGs) => {
  const wordCount = {};

  selectedTGs.forEach(tgKey => {
    const data = dataSources[tgKey] || {};  // Access the data based on the TG key
    selectedYears.forEach(year => {
      if (data[year]) {
        selectedVamTypes.forEach(type => {
          if (data[year][type]) {
            data[year][type].forEach(({ value, count }) => {
              if (wordCount[value]) {
                wordCount[value] += count;
              } else {
                wordCount[value] = count;
              }
            });
          }
        });
      }
    });
  });

  // Convert wordCount object to an array of { value, count }
  const tagsArray = Object.entries(wordCount).map(([value, count]) => ({ value, count }));

  // Sort the tags by count in descending order and slice the top 100
  const topTags = tagsArray.sort((a, b) => b.count - a.count).slice(0, 100);

  return topTags;
};

const SimpleCloud = ({ years, vamTypes, tgs }) => {
  const newKeys = getDataSourcesForKeys(tgs);
  const tags = mergeAndCountTags(years, vamTypes, newKeys);
  console.log(tags);
  return (
    <Container maxWidth="xl" sx={{ marginBottom: "2em", marginTop: "2em" }}>
      <TagCloud
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundcolor: "#f2f4fe",
          borderRadius: "2em",
          padding: "1em"
        }}
        minSize={12}
        maxSize={35}
        tags={tags}
        colorOptions={{ luminosity: "dark" }}
      />
    </Container>
  );
};

export default SimpleCloud;