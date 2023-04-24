import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Students from '@/components/Students';
import Staff from '@/components/Staff';
import Halls from '@/components/Halls';
import Complaints from '@/components/Complaints';
import { useState } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

function BasicTabs() {
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "black",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Halls"
            sx={{ width: "100%", color: "white" }}
            {...a11yProps(0)}
            onClick={() => setTabs(0)}
          />
          <Tab
            label="Students"
            sx={{ width: "100%", color: "white" }}
            {...a11yProps(1)}
            onClick={() => setTabs(1)}
          />
          <Tab
            label="Staff"
            sx={{ width: "100%", color: "white" }}
            {...a11yProps(2)}
            onClick={() => setTabs(2)}
          />
          <Tab
            label="Complaints"
            sx={{ width: "100%", color: "white" }}
            {...a11yProps(3)}
            onClick={() => setTabs(3)}
          />
        </Tabs>
      </Box>
      {tabs == 0 ? <Halls /> : <div></div>}
      {tabs == 1 ? <Students /> : <div></div>}
      {tabs == 2 ? <Staff /> : <div></div>}
      {tabs == 3 ? <Complaints /> : <div></div>}
      
    </Box>
  );
}

const dashboard = () => {
  return (
    <BasicTabs/>
  )
}

export default dashboard


/*
admin/
api/ halls/
api/ halls<drf_format_suffix:format>
api/ staffs/
api/ staffs<drf_format_suffix:format>
api/ students/
api/ students<drf_format_suffix:format>
api/ complaints/
api/ complaints<drf_format_suffix:format>
api/ halls/<int:pk>/
api/ halls/<int:pk><drf_format_suffix:format>
api/ staffs/<str:pk>/
api/ staffs/<str:pk><drf_format_suffix:format>
api/ students/<str:pk>/
api/ students/<str:pk><drf_format_suffix:format>
api/ complaints/<str:pk>/
api/ complaints/<str:pk><drf_format_suffix:format>
 */