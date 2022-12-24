import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import CustomFilter from '~/components/UI/CustomFilter';
import ViewsDatePicker from '~/components/UI/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';
import { useEffect, useState } from 'react';
import { getReceipts } from '~/services/receiptServices';

const optionsFilter = ['Tất cả', 'Giá tăng dần', 'Giá giảm dần'];
let allReceipts;

export default function Bills() {
  const [receipts, setReceipts] = useState(null);
  const [currentBill, setCurrentBill] = useState();

  const getAllReceipts = async () => {
    const receiptRes = await getReceipts();
    const receiptsData = receiptRes.data.receipts;
    // const receiptsForToday = receiptsData.filter(
    //   (receipt) => new Date(receipt.createdAt).toLocaleDateString() === new Date().toLocaleDateString(),
    // );

    allReceipts = receiptsData;
    setReceipts(receiptsData);
    setCurrentBill(receiptsData[0]);
  };

  useEffect(() => {
    getAllReceipts();
  }, []);

  const handleSelectBill = (bill) => {
    setCurrentBill(bill);
  };

  const handleFilterDate = (date) => {
    const filterReceipts = [];
    allReceipts.forEach((receipt) => {
      const currentReceiptDate = new Date(receipt.createdAt);
      if (currentReceiptDate.toLocaleDateString() === new Date(date).toLocaleDateString()) {
        filterReceipts.push(receipt);
      }
    });
    setReceipts(filterReceipts);
    if (filterReceipts.length > 0) {
      setCurrentBill(filterReceipts[0]);
    }
  };

  const handleSelectMode = (mode) => {
    if (mode === optionsFilter[0]) {
      setReceipts(allReceipts);
    }

    if (mode === optionsFilter[1]) {
      const ascPriceReceipts = [...receipts];
      ascPriceReceipts.sort((a, b) => a.totalPrice - b.totalPrice);
      setReceipts(ascPriceReceipts);
    }

    if (mode === optionsFilter[2]) {
      const desPriceReceipts = [...receipts];
      desPriceReceipts.sort((a, b) => b.totalPrice - a.totalPrice);
      setReceipts(desPriceReceipts);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} xl={5}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Hóa đơn
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }} spacing={3}>
            <CustomFilter options={optionsFilter} onSelect={handleSelectMode} />
            <ViewsDatePicker onFilter={handleFilterDate} />
          </Stack>
          {!receipts && (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
              <CircularProgress />
            </Box>
          )}
          {receipts && receipts.length > 0 && <ListBill bills={receipts} onSelectBill={handleSelectBill} />}
          {receipts && receipts.length === 0 && (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
              <Typography>Không tìm thấy hóa đơn nào</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6} xl={7}>
          {currentBill ? (
            <BillDetail bill={currentBill} onReloadReceipts={getAllReceipts} />
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
