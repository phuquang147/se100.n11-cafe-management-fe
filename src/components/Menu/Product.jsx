import { useState } from 'react';
import { Link } from 'react-router-dom';
// material
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// components
import ConfirmModal from '~/components/UI/ConfirmModal';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import { deleteProduct } from '~/services/productServices';
import { toast } from 'react-toastify';

export default function Product({ data, onLoadProducts }) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await deleteProduct(data._id);
      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        onLoadProducts();
        handleCloseConfirmDeleteModal();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <Stack rowGap={1}>
          <img src={`http://localhost:3001/${data.image}`} alt={data.name} crossOrigin="anonymous" />
          <Stack rowGap={1} sx={{ px: 2, pb: 2 }}>
            <Stack>
              <Typography
                variant="h6"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {data.name}
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: '800' }}>
                {printNumberWithCommas(data.price)} VNĐ
              </Typography>
            </Stack>
            <Grid container columnSpacing={1}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ py: '6px', borderRadius: '10px' }}
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Xóa
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ py: '6px', borderRadius: '10px' }}
                  component={Link}
                  to={`/menu/edit/${data._id}`}
                  state={data}
                >
                  Chỉnh sửa
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Card>
      {showConfirmDeleteModal && (
        <ConfirmModal
          open={showConfirmDeleteModal}
          content="Bạn chắc chắn muốn xóa sản phẩm?"
          handleClose={handleCloseConfirmDeleteModal}
          action={handleDeleteProduct}
        />
      )}
    </>
  );
}
