import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { MetaTags } from 'react-meta-tags';
import CustomSelect from '~/components/UI/CustomSelect';
import ViewsDatePicker from '~/components/UI/ViewsDatePicker';
import ListBill from '~/components/Bills/ListBill';
import BillDetail from '~/components/Bills/BillDetail';
import { useEffect, useState } from 'react';
import { getReceipts } from '~/services/receiptServices';

const optionsFilter = ['Tất cả', 'Giá tăng dần', 'Giá giảm dần', 'Đã thanh toán', 'Chưa thanh toán', 'Đã hủy'];
let ALL_RECEIPTS = [];
const ASC_PRICE_RECEIPTS = [];
const DESC_PRICE_RECEIPTS = [];
const PAID_RECEIPTS = [];
const UNPAID_RECEIPTS = [];
const CANCELLED_RECEIPTS = [];

export default function Bills() {
  const [receipts, setReceipts] = useState(null);
  const [currentBill, setCurrentBill] = useState();
  const [mode, setMode] = useState(optionsFilter[0]);

  const getAllReceipts = async () => {
    const receiptRes = await getReceipts();
    const receiptsData = receiptRes.data.receipts;
    // const receiptsForToday = receiptsData.filter(
    //   (receipt) => new Date(receipt.createdAt).toLocaleDateString() === new Date().toLocaleDateString(),
    // );

    ALL_RECEIPTS = [];
    ALL_RECEIPTS.push(...receiptsData);
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
    console.log(date);
    console.log(mode);
    const filterReceipts = [];
    let currentReceipts;
    switch (mode) {
      case optionsFilter[0]:
        currentReceipts = [...ALL_RECEIPTS];
        break;
      case optionsFilter[1]:
        currentReceipts = [...ASC_PRICE_RECEIPTS];
        break;
      case optionsFilter[2]:
        currentReceipts = [...DESC_PRICE_RECEIPTS];
        break;
      case optionsFilter[3]:
        currentReceipts = [...PAID_RECEIPTS];
        break;
      case optionsFilter[4]:
        currentReceipts = [...UNPAID_RECEIPTS];
        break;
      case optionsFilter[5]:
        currentReceipts = [...CANCELLED_RECEIPTS];
        break;
      default:
        break;
    }

    console.log(currentReceipts);

    currentReceipts.forEach((receipt) => {
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
    setMode(mode);

    if (mode === optionsFilter[0]) {
      console.log('all');
      setReceipts(ALL_RECEIPTS);
    }

    if (mode === optionsFilter[1]) {
      const ascPriceReceipts = [...receipts];
      ascPriceReceipts.sort((a, b) => a.totalPrice - b.totalPrice);
      if (ASC_PRICE_RECEIPTS.length === 0) {
        console.log('asc');
        ASC_PRICE_RECEIPTS.push(...ascPriceReceipts);
        console.log(ASC_PRICE_RECEIPTS);
      }
      setReceipts(ascPriceReceipts);
    }

    if (mode === optionsFilter[2]) {
      const desPriceReceipts = [...receipts];
      desPriceReceipts.sort((a, b) => b.totalPrice - a.totalPrice);
      if (DESC_PRICE_RECEIPTS.length === 0) {
        console.log('desc');
        DESC_PRICE_RECEIPTS.push(...desPriceReceipts);
        console.log(DESC_PRICE_RECEIPTS);
      }
      setReceipts(desPriceReceipts);
    }

    if (mode === optionsFilter[3]) {
      const paidReceipts = ALL_RECEIPTS.filter((receipt) => receipt.state === optionsFilter[3]);
      if (PAID_RECEIPTS.length === 0) {
        console.log('paid');
        PAID_RECEIPTS.push(...paidReceipts);
        console.log(PAID_RECEIPTS);
      }
      setReceipts(paidReceipts);
    }

    if (mode === optionsFilter[4]) {
      const unpaidReceipts = ALL_RECEIPTS.filter((receipt) => receipt.state === optionsFilter[4]);
      if (UNPAID_RECEIPTS.length === 0) {
        console.log('unpaid');
        UNPAID_RECEIPTS.push(...unpaidReceipts);
        console.log(UNPAID_RECEIPTS);
      }
      setReceipts(unpaidReceipts);
    }

    if (mode === optionsFilter[5]) {
      const cancelledReceipts = ALL_RECEIPTS.filter((receipt) => receipt.state === optionsFilter[5]);
      if (CANCELLED_RECEIPTS.length === 0) {
        console.log('cancelled');
        CANCELLED_RECEIPTS.push(...cancelledReceipts);
        console.log(CANCELLED_RECEIPTS);
      }
      setReceipts(cancelledReceipts);
    }
  };

  return (
    <Container maxWidth="xl">
      <MetaTags>
        <title>Brother Coffee - Hóa đơn</title>
      </MetaTags>
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
