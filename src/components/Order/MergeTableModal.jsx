import { Box, Button, CircularProgress, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import Iconify from '~/components/UI/Iconify';
import { useEffect, useState } from 'react';
import { getTables, mergeTable } from '~/services/tableServices';
import { toast } from 'react-toastify';
import ConfirmModal from '../UI/ConfirmModal';
import MergedTable from '../Table/MergedTable';

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

export default function MergeTableModal({ isOpen, selectedTable, onCloseModal, onReloadTables }) {
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmMoveTableModal, setShowConfirmMoveTableModal] = useState(false);

  const handleOpenConfirmMergeTableModal = () => {
    setShowConfirmMoveTableModal(true);
  };

  const handleCloseConfirmMergeTableModal = () => {
    setShowConfirmMoveTableModal(false);
  };

  const handleSelectTable = (table) => {
    const updatedSelectedTables = [...selectedTables];
    updatedSelectedTables.push(table);
    setSelectedTables(updatedSelectedTables);
  };

  const handleDeselectTable = (table) => {
    const updatedSelectedTables = [...selectedTables];
    const filterSelectedTables = updatedSelectedTables.filter((item) => item._id !== table._id);
    setSelectedTables(filterSelectedTables);
  };

  const handleMergeTable = async () => {
    try {
      const tableIds = selectedTables.map((table) => table._id);
      tableIds.push(selectedTable._id);
      console.log(tableIds);

      const tableRes = await mergeTable(tableIds);
      if (tableRes.status === 201) {
        toast.success(tableRes.data.message);
        onReloadTables();
      }
    } catch (error) {
      toast.error(error?.reponse?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
    handleCloseConfirmMergeTableModal();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedTables([]);
    onCloseModal();
  };

  useEffect(() => {
    const getAllTables = async () => {
      setLoading(true);
      const res = await getTables();
      if (res.status !== 200) {
        setLoading(false);
        return toast.error('Có lỗi xảy ra khi tải trang');
      }

      const tables = res.data.tables;
      const filteredTables = tables.filter(
        (table) => table._id !== selectedTable._id && table?.receipt?._id !== selectedTable.receipt._id,
      );
      setTables(filteredTables);
      setLoading(false);
    };

    if (selectedTable) {
      getAllTables();
    }
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
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Gộp bàn</Typography>
          <IconButton onClick={handleCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>
        <Grid container spacing={3} mt={2}>
          {tables.map((table, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <MergedTable table={table} onSelectTable={handleSelectTable} onDeselectTable={handleDeselectTable} />
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" justifyContent="end" alignItems="center" sx={{ mt: 3 }}>
          <Button variant="contained" onClick={handleOpenConfirmMergeTableModal}>
            Gộp bàn
          </Button>
        </Stack>
        {showConfirmMoveTableModal && (
          <ConfirmModal
            open={showConfirmMoveTableModal}
            content="Bạn chắc chắn muốn gộp bàn?"
            handleClose={handleCloseConfirmMergeTableModal}
            action={handleMergeTable}
          />
        )}
      </Container>
    </Modal>
  );
}
