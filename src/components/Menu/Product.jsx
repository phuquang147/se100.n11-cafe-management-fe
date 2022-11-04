import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBySideMagnifier } from 'react-image-magnifiers';
// material
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// components
import ConfirmModal from '~/components/UI/ConfirmModal';

export default function Product() {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleDeleteProduct = () => {};

  return (
    <>
      <Card>
        <Stack rowGap={1}>
          <SideBySideMagnifier
            imageSrc="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
            imageAlt="product-img"
            alwaysInPlace={true}
            style={{ maxWidth: '100%' }}
            touchActivation="doubleTap"
          />
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
                Hi-Tea Vải Lorem ipsum dolor sit amet.
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: '800' }}>
                50.000 VNĐ
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
                  to="/menu/edit/abs"
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
          content="Bạn chắc chắn muốn xóa sản phẩm?"
          handleClose={handleCloseConfirmDeleteModal}
          action={handleDeleteProduct}
        />
      )}
    </>
  );
}
