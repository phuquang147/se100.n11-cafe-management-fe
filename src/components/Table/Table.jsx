import { useEffect, useRef, useState } from 'react';
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
  openMoveTableModal,
  openMergeTableModal,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [mergedTo, setMergedTo] = useState();
  // console.log(table);

  useEffect(() => {
    const checkTableIsMerged = async () => {
      if (!table.receipt) {
        setMergedTo(null);
        return;
      }

      const selectedTable = table.receipt.tables[table.receipt.tables.length - 1];
      if (table._id !== selectedTable._id) {
        setMergedTo(selectedTable.name);
      }
    };

    checkTableIsMerged();
  }, [table]);

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

  const handleOpenEditForm = () => {
    handleClose();
    onOpenEditForm(table);
  };

  const handleOpenMoveTableModal = () => {
    handleClose();
    openMoveTableModal(table);
  };

  const handleOpenMergeTableModal = () => {
    handleClose();
    openMergeTableModal(table);
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
            {mergedTo && (
              <IconButton ref={anchorRef} onClick={handleOpen}>
                <Iconify icon={open ? 'eva:close-fill' : 'bx:dots-horizontal-rounded'} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
            {table?.receipt?.tables?.length === 1 && (
              <IconButton ref={anchorRef} onClick={handleOpen}>
                <Iconify icon={open ? 'eva:close-fill' : 'bx:dots-horizontal-rounded'} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
            {!mergedTo && table.state === 'Còn trống' && (
              <IconButton ref={anchorRef} onClick={handleOpen}>
                <Iconify icon={open ? 'eva:close-fill' : 'bx:dots-horizontal-rounded'} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
          </Stack>
          {!mergedTo && table.state === 'Còn trống' && (
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={() => handleOpenModalFood(table)}
            >
              Chọn món
            </Button>
          )}

          {!mergedTo && table.state === 'Đang dùng' && (
            <Button
              variant="contained"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={() => onOpenBillModal(table?.receipt?._id)}
            >
              Thanh toán
            </Button>
          )}

          {mergedTo && (
            <Typography sx={{ textAlign: 'center', height: '36px', lineHeight: '36px' }}>
              Đang gộp với <strong>{mergedTo}</strong>
            </Typography>
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
            <MenuItem onClick={handleOpenEditForm}>Chỉnh sửa bàn</MenuItem>
            <MenuItem onClick={handleOpenConfirmDeleteModal}>Xóa bàn</MenuItem>
          </Stack>
        ) : (
          <Stack sx={{ p: 1 }}>
            <MenuItem onClick={handleOpenMoveTableModal}>Chuyển bàn</MenuItem>
            <MenuItem onClick={handleOpenMergeTableModal}>Gộp bàn</MenuItem>
          </Stack>
        )}
      </MenuPopover>
    </>
  );
}
