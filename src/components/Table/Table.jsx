import { useRef, useState } from 'react';
// material
import { Button, Card, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material';
// components
import ConfirmModal from '~/components/UI/ConfirmModal';
import Iconify from '~/components/UI/Iconify';
import MenuPopover from '~/HOC/MenuPopover';
// images
import tableImg from '~/assets/images/table.svg';
import tableUsedImg from '~/assets/images/table_used.svg';
import { deleteTable } from '~/services/tableServices';
import { toast } from 'react-toastify';

export default function Table({
  table,
  onOpenModalFood,
  onOpenBillModal,
  onOpenEditForm,
  onLoadTables,
  openChangeTableModal,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleOpenModalFood = (table) => {
    onOpenModalFood(table);
  };

  const handleDeleteTable = async () => {
    try {
      const res = await deleteTable(table._id);

      if (res.status === 200) {
        toast.success(res.data.message);
        onLoadTables();
      } else {
        toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Card sx={{ padding: '12px' }}>
        <Stack rowGap={1}>
          <Stack direction="row" alignItems="start">
            <Grid container columnSpacing={2}>
              <Grid item xs={3}>
                <img src={table.state === 'Còn trống' ? tableImg : tableUsedImg} alt="" draggable="false" />
              </Grid>
              <Grid item xs={9}>
                <Stack>
                  <Typography variant="h6">{table.name}</Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: '800' }}>
                    {table.state}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <IconButton ref={anchorRef} onClick={handleOpen}>
              <Iconify icon={open ? 'eva:close-fill' : 'bx:dots-horizontal-rounded'} sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Stack>
          {table.state === 'Còn trống' ? (
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={() => handleOpenModalFood(table)}
            >
              Chọn món
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={() => onOpenBillModal(table?.receipt?._id)}
            >
              Thanh toán
            </Button>
          )}
        </Stack>
      </Card>

      {showConfirmDeleteModal && (
        <ConfirmModal
          open={showConfirmDeleteModal}
          content="Bạn chắc chắn muốn xóa bàn?"
          handleClose={handleCloseConfirmDeleteModal}
          action={handleDeleteTable}
        />
      )}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {table.state === 'Còn trống' ? (
          <Stack sx={{ p: 1 }}>
            <MenuItem onClick={() => onOpenEditForm(table)}>Chỉnh sửa bàn</MenuItem>
            <MenuItem onClick={handleOpenConfirmDeleteModal}>Xóa bàn</MenuItem>
          </Stack>
        ) : (
          <Stack sx={{ p: 1 }}>
            <MenuItem onClick={openChangeTableModal}>Chuyển bàn / Gộp bàn</MenuItem>
          </Stack>
        )}
      </MenuPopover>
    </>
  );
}
