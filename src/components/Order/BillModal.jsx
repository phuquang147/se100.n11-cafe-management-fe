import { Box, Button, Grid, IconButton, Modal, Stack, Typography, Card } from '@mui/material';
import { toast } from 'react-toastify';
import Iconify from '~/components/UI/Iconify';
import { payForReceipt } from '~/services/receiptServices';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '70%',
    md: '40%',
  },
  maxHeight: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: {
    xs: '12px',
    md: 4,
  },
};

export default function BillModal({ isOpen, receipt, onReloadTables, onCloseModal }) {
  const handlePay = async () => {
    onCloseModal();
    try {
      const receiptRes = await payForReceipt(receipt._id);
      if (receiptRes.status === 200) {
        toast.success(receiptRes.data.message);
        await onReloadTables();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Hóa đơn</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>
        <Grid container spacing={2}>
          {receipt &&
            receipt.products.map((product, index) => (
              <Grid key={index} item xs={12}>
                <Card sx={{ p: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <img
                        src={`http://localhost:3001/${product.product.image}`}
                        alt="product-img"
                        style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                        crossOrigin="anonymous"
                      />
                      <Typography
                        variant="h6"
                        sx={{ whiteSpace: 'nowrap', width: '130px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {product.product.name} x {product.quantity}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2">{printNumberWithCommas(product.product.price)} VNĐ</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="h6">Tổng</Typography>
          {receipt && <Typography variant="h6">{printNumberWithCommas(receipt.totalPrice)} VNĐ</Typography>}
        </Stack>
        <Button variant="contained" fullWidth sx={{ height: '40px', mt: 3 }} onClick={handlePay}>
          Thanh toán
        </Button>
      </Box>
    </Modal>
  );
}
