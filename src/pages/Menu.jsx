import { useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { Box, Button, Container, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Product from '~/components/Menu/Product';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Menu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Menu</Typography>

        <Button variant="contained" component={Link} to="/menu/new" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm món
        </Button>
      </Stack>
      <Stack
        direction="row"
        columnGap={2}
        justifyContent="space-between"
        sx={{ borderColor: 'divider', display: 'flex' }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cà phê" />
          <Tab label="Đồ ăn nhẹ" />
        </Tabs>
        <TextField variant="outlined" placeholder="Tìm kiếm" sx={{ flex: '1', maxWidth: '300px' }} />
      </Stack>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Product />
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
}
