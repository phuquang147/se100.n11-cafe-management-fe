import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BillModal from '~/components/Order/BillModal';
import ChangeTableModal from '~/components/Order/ChangeTableModal';
import ChooseFoodModal from '~/components/Order/ChooseFoodModal';
import Table from '~/components/Table/Table';
import TableFormModal from '~/components/Table/TableFormModal';
import Iconify from '~/components/UI/Iconify';
import { getTables } from '~/services/tableService';

export default function Order() {
  const [tables, setTables] = useState([]);
  const [editedTable, setEditedTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [openChangeTableModal, setOpenChangeTableModal] = useState(false);
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

  const handleOpenFoodModal = () => {
    setOpenFoodModal(true);
  };

  const handleCloseFoodModal = () => {
    setOpenFoodModal(false);
  };

  const handleOpenBillModal = () => {
    setOpenBillModal(true);
  };

  const handleCloseBillModal = () => {
    setOpenBillModal(false);
  };

  const handleOpenTableModal = () => {
    setIsOpenTableModal(true);
  };

  const handleCloseTableModal = () => {
    setEditedTable(null);
    setIsOpenTableModal(false);
  };

  const handleEditTable = (table) => {
    handleOpenTableModal();
    setEditedTable(table);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleOpenChangeTableModal = () => {
    setOpenChangeTableModal(true);
  };

  const handleCloseChangeTableModal = () => {
    setOpenChangeTableModal(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Đặt món</Typography>

        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenTableModal}>
          Thêm bàn
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid key={table._id} item xs={12} sm={6} md={4} xl={3}>
            <Table
              table={table}
              onOpenModalFood={handleOpenFoodModal}
              onPay={handleOpenBillModal}
              onOpenEditForm={handleEditTable}
              onLoadTables={getAllTables}
              openChangeTableModal={handleOpenChangeTableModal}
            />
          </Grid>
        ))}
      </Grid>

      <ChooseFoodModal isOpen={openFoodModal} onCloseModal={handleCloseFoodModal} />
      <BillModal isOpen={openBillModal} onCloseModal={handleCloseBillModal} />
      {isOpenTableModal && (
        <TableFormModal
          table={editedTable}
          isOpen={isOpenTableModal}
          onCloseModal={handleCloseTableModal}
          onLoadTables={getAllTables}
        />
      )}

      <ChangeTableModal isOpen={openChangeTableModal} onCloseModal={handleCloseChangeTableModal} />
    </Container>
  );
}
