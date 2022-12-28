import { useState } from 'react';
// @mui
import { Box, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
// components
import DayReport from '~/components/Report/DayReport';
import MonthReport from '~/components/Report/MonthReport';
import YearReport from '~/components/Report/YearReport';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

export default function Report() {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Báo cáo</Typography>
      </Stack>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChangeTab} variant="scrollable" scrollButtons allowScrollButtonsMobile>
            <Tab label="Báo cáo theo ngày" {...a11yProps(0)} />
            <Tab label="Báo cáo theo tháng" {...a11yProps(1)} />
            <Tab label="Báo cáo theo năm" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <DayReport />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <MonthReport />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <YearReport />
        </TabPanel>
      </Box>
    </Container>
  );
}
