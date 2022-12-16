import { Box, CircularProgress, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import Iconify from '~/components/UI/Iconify';
import MovedTable from '~/components/Table/MovedTable';
import { useEffect, useState } from 'react';
import { getTables } from '~/services/tableServices';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '100%',
    md: '90%',
  },
  height: {
    xs: '100%',
    md: '80%',
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

export default function MoveTableModal({ isOpen, selectedTable, onCloseModal, onReloadTables }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTables = async () => {
      setLoading(true);
      const res = await getTables();
      if (res.status !== 200) {
        setLoading(false);
        return toast.error('Có lỗi xảy ra khi tải trang');
      }

      const tables = res.data.tables;
      const filteredTables = tables.filter((table) => table._id !== selectedTable?._id && table.state === 'Còn trống');
      setTables(filteredTables);
      setLoading(false);
    };

    getAllTables();
  }, [selectedTable]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Modal
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Chuyển bàn</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>
        <Grid container spacing={3} mt={2}>
          {tables.map((table, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <MovedTable
                table={table}
                selectedTable={selectedTable}
                onCloseModal={onCloseModal}
                onReloadTables={onReloadTables}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Modal>
  );
}
