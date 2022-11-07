import { Button, Grid, Stack, Typography, Container } from '@mui/material';
import { useState } from 'react';
import Table from '~/components/Order/Table';
import Iconify from '~/components/UI/Iconify';
import { Link } from 'react-router-dom';
import ChooseFoodModal from '~/components/Order/ChooseFoodModal';

export default function Order() {
  const [openFoodModal, setOpenFoodModal] = useState(false);

  const handleOpenModal = () => {
    setOpenFoodModal(true);
  };

  const handleCloseModal = () => {
    setOpenFoodModal(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Đặt món</Typography>

        <Button variant="contained" component={Link} to="/menu/new" startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm bàn
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <Table onOpenModalFood={handleOpenModal} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <Table onOpenModalFood={handleOpenModal} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <Table onOpenModalFood={handleOpenModal} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <Table onOpenModalFood={handleOpenModal} />
        </Grid>
      </Grid>

      <ChooseFoodModal isOpen={openFoodModal} onCloseModal={handleCloseModal} />
    </Container>
  );
}
