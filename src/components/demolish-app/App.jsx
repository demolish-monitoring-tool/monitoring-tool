import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IncidentDashboard from './IncidentDashboard';
import TweetsDashboard from './TweetsDashboard';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 2, borderColor: 'tomato' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: '#2a2a2a',
              transition: 'background-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                color: 'tomato',
                backgroundColor: 'rgba(255, 99, 71, 0.1)',
              },
            },
            '& .Mui-selected': {
              color: '#fff !important',
              backgroundColor: '#2a2a2a',
              '&:hover': {
                color: '#fff !important',
                backgroundColor: '#2a2a2a',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'tomato',
            },
          }}
        >
          <Tab label="Tweets dashboard" {...a11yProps(0)} />
          <Tab label="Events dashboard" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TweetsDashboard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IncidentDashboard />
      </CustomTabPanel>
    </Box>
  );
}
