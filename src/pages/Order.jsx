import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BillModal from '~/components/Order/BillModal';
import MoveTableModal from '~/components/Order/MoveTableModal';
import ChooseFoodModal from '~/components/Order/ChooseFoodModal';
import Table from '~/components/Table/Table';
import TableFormModal from '~/components/Table/TableFormModal';
import Iconify from '~/components/UI/Iconify';
import { getReceiptById } from '~/services/receiptServices';
import { createTable, getTables } from '~/services/tableServices';
import MergeTableModal from '~/components/Order/MergeTableModal';

export default function Order() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [receipt, setReceipt] = useState();
  const [editedTable, setEditedTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [mode, setMode] = useState();
  const [openMoveTableModal, setOpenMoveTableModal] = useState(false);
  const [openMergeTableModal, setOpenMergeTableModal] = useState(false);
  const [isOpenTableModal, setIsOpenTableModal] = useState(false);

  const getAllTables = async () => {
    const res = await getTables();
    if (res.status !== 200) {
      return toast.error('Có lỗi xảy ra khi tải trang');
    }

    const tables = res.data.tables;
    setTables(tables);
  };

  useEffect(() => {
    const loadTables = async () => {
      setLoading(true);
      await getAllTables();
      setLoading(false);
    };

    loadTables();
  }, []);

  const handleOpenFoodModal = (table) => {
    setSelectedTable(table);
    setOpenFoodModal(true);
  };

  const handleCloseFoodModal = () => {
    setOpenFoodModal(false);
  };

  const handleOpenBillModal = async (receiptId) => {
    const res = await getReceiptById(receiptId);
    setReceipt(res.data.receipt);
    setOpenBillModal(true);
  };

  const handleCloseBillModal = () => {
    setOpenBillModal(false);
  };

  const handleAddTable = async () => {
    try {
      const tableRes = await createTable({ name: `Bàn ${tables.length + 1}` });
      if (tableRes.status === 201) {
        toast.success(tableRes.data.message);
        await getAllTables();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  const handleCloseTableModal = () => {
    setEditedTable(null);
    setIsOpenTableModal(false);
  };

  const handleEditTable = (table) => {
    setIsOpenTableModal(true);
    setEditedTable(table);
  };

  const handleOpenMoveTableModal = (table) => {
    setSelectedTable(table);
    setMode('move');
    setOpenMoveTableModal(true);
  };

  const handleCloseMoveTableModal = () => {
    setOpenMoveTableModal(false);
  };

  const handleOpenMergeTableModal = (table) => {
    console.log(table);
    setSelectedTable(table);
    setMode('merge');
    setOpenMergeTableModal(true);
  };

  const handleCloseMergeTableModal = () => {
    setOpenMergeTableModal(false);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Đặt món</Typography>

        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddTable}>
          Thêm bàn
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid key={table._id} item xs={12} sm={6} md={4} xl={3}>
            <Table
              table={table}
              onOpenModalFood={handleOpenFoodModal}
              onOpenBillModal={handleOpenBillModal}
              onOpenEditForm={handleEditTable}
              onLoadTables={getAllTables}
              openMoveTableModal={handleOpenMoveTableModal}
              openMergeTableModal={handleOpenMergeTableModal}
            />
          </Grid>
        ))}
      </Grid>

      <ChooseFoodModal
        isOpen={openFoodModal}
        selectedTable={selectedTable}
        onCloseModal={handleCloseFoodModal}
        onReloadTables={getAllTables}
      />
      <BillModal
        isOpen={openBillModal}
        receipt={receipt}
        onCloseModal={handleCloseBillModal}
        onReloadTables={getAllTables}
      />
      {isOpenTableModal && (
        <TableFormModal
          table={editedTable}
          isOpen={isOpenTableModal}
          onCloseModal={handleCloseTableModal}
          onLoadTables={getAllTables}
        />
      )}

      {mode === 'move' && (
        <MoveTableModal
          isOpen={openMoveTableModal}
          selectedTable={selectedTable}
          onCloseModal={handleCloseMoveTableModal}
          onReloadTables={getAllTables}
        />
      )}

      {mode === 'merge' && selectedTable.receipt && (
        <MergeTableModal
          isOpen={openMergeTableModal}
          selectedTable={selectedTable}
          onCloseModal={handleCloseMergeTableModal}
          onReloadTables={getAllTables}
        />
      )}
    </Container>
  );
}
