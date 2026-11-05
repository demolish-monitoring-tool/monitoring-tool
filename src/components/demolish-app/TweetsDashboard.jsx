
import * as React from 'react';
import PropTypes from 'prop-types';
import BarChartWithControls from './BarChartWithControls';
import LineChart from './LineChart';
import VARateStatistics from './VARateStatistics';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function TweetsDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
    <Box sx={{ width: '100%' }} p={3}>
      <Box sx={{ borderBottom: 1 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tweets statistics" {...a11yProps(0)} />
          <Tab label="VA rate statistics" {...a11yProps(1)} />
          <Tab label="VA monitoring tool" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BarChartWithControls />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VARateStatistics />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <LineChart />
      </CustomTabPanel>
    </Box>
  </>);
}

export default TweetsDashboard;
