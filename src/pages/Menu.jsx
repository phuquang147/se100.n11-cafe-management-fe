import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useResponsive from '~/hooks/useResponsive';
// @mui
import { Box, Button, Container, Grid, Stack, Tabs, TextField, Typography } from '@mui/material';
// components
import CategoryModal from '~/components/Menu/CategoryModal';
import CategoryTab from '~/components/Menu/CategoryTab';
import Product from '~/components/Menu/Product';
import Iconify from '~/components/UI/Iconify';

const products = [...Array(6)].map((_) => ({
  id: faker.datatype.uuid(),
  img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
  name: faker.name.fullName(),
  price: faker.datatype.number({ min: 20000, max: 100000, precision: 1000 }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Menu() {
  const isMobile = useResponsive('down', 'md');
  const [value, setValue] = useState(0);
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleOpenNewCategoryModal = () => {
    setOpenNewCategoryModal(true);
  };

  const handleCloseNewCategoryModal = () => {
    setOpenNewCategoryModal(false);
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
        direction={isMobile ? 'column' : 'row'}
        gap={2}
        justifyContent="space-between"
        sx={{ borderColor: 'divider', display: 'flex' }}
      >
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          <CategoryTab label="Cà phê" value={0} handleChange={handleChange} />
          <CategoryTab label="Đồ ăn nhẹ" value={1} handleChange={handleChange} />

          <Button onClick={handleOpenNewCategoryModal}>
            <Iconify icon="ic:round-plus" width={32} height={32} />
          </Button>
        </Tabs>
        <TextField variant="outlined" placeholder="Tìm kiếm" sx={{ flex: '1', width: '100%', maxWidth: '300px' }} />
      </Stack>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <Product data={product} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {/* {products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <Product data={product} />
            </Grid>
          ))} */}
        </Grid>
      </TabPanel>

      <CategoryModal type="new" isOpen={openNewCategoryModal} onCloseModal={handleCloseNewCategoryModal} />
    </Container>
  );
}
