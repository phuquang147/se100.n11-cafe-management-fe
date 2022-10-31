import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import CustomFilter from '~/components/CustomFilter';
import ViewsDatePicker from '~/components/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';

const optionsFilter = ['All orders', 'Asc number', 'Desc number', 'Asc price', 'Desc price'];

export default function Bills() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} xl={4}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Bills
            </Typography>
            <Button variant="contained" sx={{ fontSize: 20 }}>
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
