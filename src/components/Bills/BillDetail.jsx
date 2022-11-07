import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Iconify from '../UI/Iconify';
import ConfirmModal from '../UI/ConfirmModal';

export default function BillDetail({ bill }) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleDeleteBill = () => {};

  const handleEdit = () => {
    navigate('/bills/edit/35');
  };

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
              Đơn #{bill.order}
            </Typography>
            <IconButton size="small" color="primary" onClick={handleEdit}>
              <Iconify icon="ic:baseline-mode-edit" width={24} height={24} />
            </IconButton>
            <IconButton size="small" color="primary" onClick={handleOpenConfirmDeleteModal}>
              <Iconify icon="bxs:trash-alt" width={24} height={24} />
            </IconButton>
          </Stack>
          <Button
            sx={{
              backgroundColor: bill.status === 'Đang uống' ? theme.palette.primary.main : theme.palette.success.main,
              '&:hover': {
                backgroundColor: bill.status === 'Đang uống' ? theme.palette.primary.dark : theme.palette.success.dark,
              },
              color: 'white',
              width: '160px',
              height: '40px',
              cursor: 'default',
            }}
          >
            {bill.status}
          </Button>
        </Stack>
        <Divider />
        <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
          Chi tiết
        </Typography>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
              Bàn
            </Typography>
            <Typography variant="h6">{bill.table}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
              Khách
            </Typography>
            <Typography variant="h6">{bill.guests}</Typography>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
          Thông tin hóa đơn
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Sản phẩm
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Giá
          </Typography>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <nav aria-label="main">
            <List>
              {bill.products.map((product, index) => (
                <Box key={index}>
                  <ListItem disablePadding secondaryAction={`${product.price * product.quantity} VNĐ`}>
                    <ListItemButton>
                      <ListItemIcon>
                        <img
                          src={product.img}
                          alt="product-img"
                          style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {product.name} x {product.quantity}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  Tổng
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  {bill.products.reduce((acc, cur) => {
                    return acc + cur.price * cur.quantity;
                  }, 0)}{' '}
                  VNĐ
                </Typography>
              </Stack>
            </List>
          </nav>
        </Box>
      </Box>
      {showConfirmDeleteModal && (
        <ConfirmModal
          content="Bạn chắc chắn muốn xóa sản phẩm?"
          open={showConfirmDeleteModal}
          handleClose={handleCloseConfirmDeleteModal}
          action={handleDeleteBill}
        />
      )}
    </>
  );
}
