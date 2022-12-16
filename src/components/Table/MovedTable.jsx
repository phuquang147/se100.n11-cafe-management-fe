import { useState } from 'react';
// material
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// images
import tableImg from '~/assets/images/table.svg';
import tableUsedImg from '~/assets/images/table_used.svg';
// components
import ConfirmModal from '~/components/UI/ConfirmModal';
import { moveTable } from '~/services/tableServices';
import { toast } from 'react-toastify';

export default function MovedTable({ table, selectedTable, onCloseModal, onReloadTables }) {
  const [showConfirmMoveTableModal, setShowConfirmMoveTableModal] = useState(false);

  const handleOpenConfirmMoveTableModal = () => {
    setShowConfirmMoveTableModal(true);
  };

  const handleCloseConfirmMoveTableModal = () => {
    setShowConfirmMoveTableModal(false);
  };

  const handleMoveTable = async () => {
    handleCloseConfirmMoveTableModal();
    onCloseModal();
    try {
      const tableRes = await moveTable(selectedTable._id, table._id);
      if (tableRes.status === 200) {
        toast.success(tableRes.data.message);
        onReloadTables();
      }
    } catch (error) {}
  };

  return (
    <>
      <Card
        sx={{
          padding: '12px',
        }}
      >
        <Stack rowGap={2}>
          <Stack direction="row" alignItems="start">
            <Grid container columnSpacing={2}>
              <Grid item xs={3}>
                <img src={table.state === 'Còn trống' ? tableImg : tableUsedImg} alt="" draggable="false" />
              </Grid>
              <Grid item xs={9}>
                <Stack>
                  <Typography variant="h6" sx={{ color: '#888' }}>
                    {table.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '800', color: '#ffa16c' }}>
                    {table.state}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={{ py: '6px', borderRadius: '10px' }}
            onClick={handleOpenConfirmMoveTableModal}
          >
            Chuyển bàn
          </Button>
        </Stack>
      </Card>

      {showConfirmMoveTableModal && (
        <ConfirmModal
          open={showConfirmMoveTableModal}
          content="Bạn chắc chắn muốn chuyển bàn?"
          handleClose={handleCloseConfirmMoveTableModal}
          action={handleMoveTable}
        />
      )}
    </>
  );
}
