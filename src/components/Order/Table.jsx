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

const _ = require('lodash');
export default function Table({ onOpenModalFood }) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const handleOpenModalFood = () => {
    onOpenModalFood();
  };

  const handleDeleteTable = () => {};

  const r = _.random(1, 2);

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
      <Card sx={{ padding: 1 }}>
        <Stack rowGap={1}>
          <Stack direction="row" alignItems="start">
            <Grid container columnSpacing={2}>
              <Grid item xs={3}>
                <img src={r === 1 ? tableImg : tableUsedImg} alt="" draggable="false" />
              </Grid>
              <Grid item xs={9}>
                <Stack>
                  <Typography variant="h6">Bàn 1</Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: '800' }}>
                    {r === 1 ? 'Còn trống' : 'Đã có khách'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <IconButton ref={anchorRef} onClick={handleOpen}>
              <Iconify icon={open ? 'eva:close-fill' : 'bx:dots-horizontal-rounded'} sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Stack>
          {r === 1 ? (
            <Button variant="outlined" fullWidth sx={{ py: '6px', borderRadius: '10px' }} onClick={handleOpenModalFood}>
              Chọn món
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={handleOpenModalFood}
            >
              Thanh toán
            </Button>
          )}
        </Stack>
      </Card>

      {showConfirmDeleteModal && (
        <ConfirmModal
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
        {r === 1 ? (
          <Stack sx={{ p: 1 }}>
            <MenuItem>Chỉnh sửa bàn</MenuItem>
            <MenuItem>Xóa bàn</MenuItem>
          </Stack>
        ) : (
          <Stack sx={{ p: 1 }}>
            <MenuItem>Chuyển bàn</MenuItem>
            <MenuItem>Gộp bàn</MenuItem>
          </Stack>
        )}
      </MenuPopover>
    </>
  );
}
