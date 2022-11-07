import { Box, Button, Grid, IconButton, Modal, Stack, Typography, Card } from '@mui/material';
import { toast } from 'react-toastify';
import Iconify from '~/components/UI/Iconify';

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
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: {
    xs: '12px',
    md: 4,
  },
};

export default function BillModal({ isOpen, onCloseModal }) {
  const handlePay = () => {
    toast.success('Thanh toán thành công');
    onCloseModal();
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
          {[...Array(1)].map((_, index) => (
            <Grid key={index} item xs={12}>
              <Card sx={{ p: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <img
                      src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                      alt="product-img"
                      style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: 'nowrap', width: '130px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      Hi-Tea Vải x 2
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">20,000 VNĐ</Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" fullWidth sx={{ height: '40px', mt: 3 }} onClick={handlePay}>
          Thanh toán
        </Button>
      </Box>
    </Modal>
  );
}
