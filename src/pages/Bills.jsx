import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import CustomFilter from '~/components/CustomFilter';
import ViewsDatePicker from '~/components/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';
import { useNavigate } from 'react-router';

const optionsFilter = ['Tất cả', 'Số thứ tự', 'Giá'];

export default function Bills() {
  const navigate = useNavigate();

  const handleCreateBill = () => {
    navigate('/bills/new');
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
          <ListBill />
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <BillDetail />
        </Grid>
      </Grid>
    </Container>
  );
}
