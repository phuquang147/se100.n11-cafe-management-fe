import { useState } from 'react';
// @mui
import { Box, Container, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import CartSidebar from '~/components/Home/CartSideBar';
import Product from '~/components/Home/Product';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Menu</Typography>
        <CartSidebar isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
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
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Product />
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
}
