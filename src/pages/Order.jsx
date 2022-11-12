import { Button, Grid, Stack, Typography, Container } from '@mui/material';
import { useState } from 'react';
import Table from '~/components/Table/Table';
import Iconify from '~/components/UI/Iconify';
import ChooseFoodModal from '~/components/Order/ChooseFoodModal';
import BillModal from '~/components/Order/BillModal';
import NewTableModal from '~/components/Table/NewTableModal';

export default function Order() {
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [isOpenTableModal, setIsOpenTableModal] = useState(false);

  const handleOpenFoodModal = () => {
    setOpenFoodModal(true);
  };

  const handleCloseFoodModal = () => {
    setOpenFoodModal(false);
  };

  const handleOpenBillModal = () => {
    setOpenBillModal(true);
  };

  const handleCloseBillModal = () => {
    setOpenBillModal(false);
  };

  const handleOpenTableModal = () => {
    setIsOpenTableModal(true);
  };

  const handleCloseTableModal = () => {
    setIsOpenTableModal(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Đặt món</Typography>

        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenTableModal}>
          Thêm bàn
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
            <Table onOpenModalFood={handleOpenFoodModal} onPay={handleOpenBillModal} />
          </Grid>
        ))}
      </Grid>

      <ChooseFoodModal isOpen={openFoodModal} onCloseModal={handleCloseFoodModal} />
      <BillModal isOpen={openBillModal} onCloseModal={handleCloseBillModal} />
      <NewTableModal isOpen={isOpenTableModal} onCloseModal={handleCloseTableModal} />
    </Container>
  );
}
