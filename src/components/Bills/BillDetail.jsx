import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
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
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import { removeReceipt } from '~/services/receiptServices';
import { toast } from 'react-toastify';

export default function BillDetail({ bill, onReloadReceipts }) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const tableNames = bill.tables.map((table, index) => {
    if (index !== bill.tables.length - 1) {
      return `${table.name} - `;
    }
    return table.name;
  });

  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleDeleteBill = async () => {
    handleCloseConfirmDeleteModal();
    try {
      const receiptRes = await removeReceipt(bill._id);
      if (receiptRes.status === 200) {
        toast.success(receiptRes.data.message);
        onReloadReceipts();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = () => {
    navigate(`/bills/edit/${bill._id}`, { state: bill });
  };

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
              Đơn #{bill._id.slice(0, 6).toUpperCase()}
            </Typography>

            {bill.state !== 'Đã thanh toán' && bill.state !== 'Đã hủy' && (
              <>
                <IconButton size="small" color="primary" onClick={handleEdit}>
                  <Iconify icon="ic:baseline-mode-edit" width={24} height={24} />
                </IconButton>
                <IconButton size="small" color="primary" onClick={handleOpenConfirmDeleteModal}>
                  <Iconify icon="bxs:trash-alt" width={24} height={24} />
                </IconButton>
              </>
            )}
          </Stack>
          <Typography
            sx={{
              backgroundColor:
                bill.state === 'Đã thanh toán'
                  ? theme.palette.success.main
                  : bill.state === 'Chưa thanh toán'
                  ? theme.palette.primary.main
                  : theme.palette.error.main,
              borderRadius: '8px',
              textAlign: 'center',
              color: 'white',
              paddingY: '8px',
              width: '160px',
              cursor: 'default',
            }}
          >
            {bill.state}
          </Typography>
        </Stack>
        <Divider />
        <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
          Chi tiết
        </Typography>
        <Stack direction="column">
          <Typography variant="subtitle1" color={theme.palette.grey[500]} sx={{ fontWeight: 'bold', mb: 1 }}>
            Bàn
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {tableNames}
            </Typography>
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
              {bill.products.map((item, index) => (
                <Box key={index}>
                  {item.quantity > 0 && (
                    <>
                      <ListItem
                        disablePadding
                        secondaryAction={`${printNumberWithCommas(item.price * item.quantity)} VNĐ`}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <img
                              src={`http://localhost:3001/${item.product.image}`}
                              alt="product-img"
                              style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                              crossOrigin="anonymous"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {item.name} x {item.quantity}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  )}
                </Box>
              ))}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  Tổng
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  {printNumberWithCommas(
                    bill.products.reduce((acc, cur) => {
                      return acc + cur.price * cur.quantity;
                    }, 0),
                  )}{' '}
                  VNĐ
                </Typography>
              </Stack>
            </List>
          </nav>
        </Box>
      </Box>
      {showConfirmDeleteModal && (
        <ConfirmModal
          content="Bạn chắc chắn muốn hủy hóa đơn?"
          open={showConfirmDeleteModal}
          handleClose={handleCloseConfirmDeleteModal}
          action={handleDeleteBill}
        />
      )}
    </>
  );
}
