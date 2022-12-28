import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import CustomSelect from '~/components/UI/CustomSelect';
import ViewsDatePicker from '~/components/UI/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';
import { useEffect, useState } from 'react';
import { getReceipts } from '~/services/receiptServices';

const optionsFilter = ['Tất cả', 'Giá tăng dần', 'Giá giảm dần', 'Đã thanh toán', 'Chưa thanh toán', 'Đã hủy'];
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
    receipts.forEach((receipt) => {
      const currentReceiptDate = new Date(receipt.createdAt);
      const isSelectedDate = currentReceiptDate.toLocaleDateString() === new Date(date).toLocaleDateString();
      if (isSelectedDate) {
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

    if (mode === optionsFilter[3]) {
      const paidReceipts = allReceipts.filter((receipt) => receipt.state === optionsFilter[3]);
      setReceipts(paidReceipts);
    }

    if (mode === optionsFilter[4]) {
      const unpaidReceipts = allReceipts.filter((receipt) => receipt.state === optionsFilter[4]);
      setReceipts(unpaidReceipts);
    }

    if (mode === optionsFilter[5]) {
      const cancelledReceipts = allReceipts.filter((receipt) => receipt.state === optionsFilter[5]);
      setReceipts(cancelledReceipts);
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
            <CustomSelect options={optionsFilter} onSelect={handleSelectMode} />
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
