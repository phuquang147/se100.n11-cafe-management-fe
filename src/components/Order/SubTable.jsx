import { useEffect, useState } from 'react';
// material
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// images
import tableImg from '~/assets/images/table.svg';
import tableUsedImg from '~/assets/images/table_used.svg';
// components
import ConfirmModal from '~/components/UI/ConfirmModal';

const _ = require('lodash');

export default function SubTable() {
  const [showConfirmMoveTableModal, setShowConfirmMoveTableModal] = useState(false);
  const [showConfirmMergeTableModal, setShowConfirmMergeTableModal] = useState(false);
  const [r, setR] = useState(1);

  const handleOpenConfirmMoveTableModal = () => {
    setShowConfirmMoveTableModal(true);
  };

  const handleCloseConfirmMoveTableModal = () => {
    setShowConfirmMoveTableModal(false);
  };

  const handleOpenConfirmMergeTableModal = () => {
    setShowConfirmMergeTableModal(true);
  };

  const handleCloseConfirmMergeTableModal = () => {
    setShowConfirmMergeTableModal(false);
  };

  const handleMoveTable = () => {};
  const handleMergeTable = () => {};

  useEffect(() => {
    setR(_.random(1, 2));
  }, []);

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
                <img src={r === 1 ? tableImg : tableUsedImg} alt="" draggable="false" />
              </Grid>
              <Grid item xs={9}>
                <Stack>
                  <Typography variant="h6" sx={{ color: '#888' }}>
                    Bàn 1
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '800', color: '#ffa16c' }}>
                    {r === 1 ? 'Còn trống' : 'Đã có khách'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          {r === 1 ? (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ py: '6px', borderRadius: '10px' }}
                onClick={handleOpenConfirmMoveTableModal}
              >
                Chuyển bàn
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: '6px', borderRadius: '10px' }}
                onClick={handleOpenConfirmMergeTableModal}
              >
                Gộp bàn
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              fullWidth
              sx={{ py: '6px', borderRadius: '10px' }}
              onClick={handleOpenConfirmMergeTableModal}
            >
              Gộp bàn
            </Button>
          )}
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

      {showConfirmMergeTableModal && (
        <ConfirmModal
          open={showConfirmMergeTableModal}
          content="Bạn chắc chắn muốn gộp bàn?"
          handleClose={handleCloseConfirmMergeTableModal}
          action={handleMergeTable}
        />
      )}
    </>
  );
}
