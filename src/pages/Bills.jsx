import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import CustomFilter from '~/components/CustomFilter';
import ViewsDatePicker from '~/components/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';
import { useNavigate } from 'react-router';
import { faker } from '@faker-js/faker';
import { useState } from 'react';

const optionsFilter = ['Tất cả', 'Số thứ tự', 'Giá'];

const fakeBills = [
  {
    order: 35,
    table: '1A',
    guests: 2,
    status: 'Đang uống',
    products: [
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
    ],
  },
  {
    order: 30,
    table: '2B',
    guests: 2,
    status: 'Đã thanh toán',
    products: [
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
    ],
  },
  {
    order: 28,
    table: '3C',
    guests: 2,
    status: 'Đang uống',
    products: [
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
      {
        img: 'https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg',
        name: faker.name.fullName(),
        quantity: 2,
        price: 12000,
      },
    ],
  },
];

export default function Bills() {
  const [currentBill, setCurrentBill] = useState(fakeBills[0]);
  const navigate = useNavigate();

  const handleCreateBill = () => {
    navigate('/bills/new');
  };

  const handleSelectBill = (bill) => {
    setCurrentBill(bill);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} xl={4}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Hóa đơn
            </Typography>
            <Button variant="contained" sx={{ fontSize: 20 }} onClick={handleCreateBill}>
              +
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }} spacing={3}>
            <CustomFilter options={optionsFilter} />
            <ViewsDatePicker />
          </Stack>
          <ListBill bills={fakeBills} onSelectBill={handleSelectBill} />
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <BillDetail bill={currentBill} />
        </Grid>
      </Grid>
    </Container>
  );
}
