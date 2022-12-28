import { MetaTags } from 'react-meta-tags';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
// components
import Label from '~/components/Label/Label';
import Iconify from '~/components/UI/Iconify';
import Scrollbar from '~/components/UI/Scrollbar';
// sections
import StaffListHead from '~/components/Staff/StaffListHead';
import StaffListToolbar from '~/components/Staff/StaffListToolbar';
// mock
// import USERLIST from '~/_mock/staff';
import ConfirmModal from '~/components/UI/ConfirmModal';
import { useEffect } from 'react';
import { deleteSelectedStaffs, deleteStaff, getStaffs } from '~/services/staffServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '~/redux/dataSlice';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Họ tên', alignRight: false },
  { id: 'role', label: 'Chức vụ', alignRight: false },
  { id: 'gender', label: 'Giới tính', alignRight: false },
  { id: 'birthday', label: 'Ngày sinh', alignRight: false },
  { id: 'status', label: 'Tình trạng', alignRight: false },
  { id: '' },
];

let allStaffs = [];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  // console.log(query, array);
  if (array.length === 0) {
    console.log(allStaffs);
    array = [...allStaffs];
  }
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().includes(query.toLowerCase()));
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Staff() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentStaff, setCurrentStaff] = useState();

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const [openConfirmDeleteSelected, setOpenConfirmDeleteSelected] = useState(false);

  const [staffs, setStaffs] = useState([]);

  const navigate = useNavigate();

  const loggedInUser = useSelector(selectUser);

  const filteredStaffs = applySortFilter(staffs, getComparator(order, orderBy), filterName);

  const getAllStaffs = useCallback(async () => {
    const staffRes = await getStaffs();
    const { users } = staffRes.data;

    allStaffs = users;
    const staffsExceptCurrentUser = users.filter(
      (user) => user._id !== loggedInUser._id && user.role.name !== 'Chủ quán',
    );
    setStaffs(staffsExceptCurrentUser);
  }, [loggedInUser._id]);

  useEffect(() => {
    getAllStaffs();
  }, [getAllStaffs]);

  const handleOpenMenu = (event, staff) => {
    setCurrentStaff(staff);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = [...staffs];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, staff) => {
    const selectedIndex = selected.findIndex((item) => item._id === staff._id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, staff);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    if (event.target.value === '') {
      setStaffs(allStaffs);
    } else {
      setStaffs(filteredStaffs);
    }
  };

  const handleDeleteStaff = async (staffId) => {
    setOpenConfirmDeleteModal(false);
    handleCloseMenu();
    try {
      const staffRes = await deleteStaff(staffId);
      if (staffRes.status === 200) {
        toast.success(staffRes.data.message);
        await getAllStaffs();
      }
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  };

  const handleDeleteSelected = async () => {
    setOpenConfirmDeleteSelected(false);
    setSelected([]);
    try {
      const staffIds = selected.map((item) => item._id);
      const staffRes = await deleteSelectedStaffs(staffIds);
      if (staffRes.status === 200) {
        toast.success(staffRes.data.message);
        await getAllStaffs();
      }
    } catch (error) {}

    // const updatedStaffs = staffs.filter((staff) => selected.findIndex((item) => item.name === staff.name) === -1);
    // setStaffs(updatedStaffs);
  };

  const handleCreateStaff = () => {
    navigate('/staffs/new');
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffs.length) : 0;

  const isNotFound = staffs.length === 0 && filterName.trim() !== '';

  if (staffs.length === 0 && filterName === '') {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container>
        <MetaTags>
          <title>Brother Coffee - Nhân viên</title>
        </MetaTags>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Nhân viên
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateStaff}>
            Thêm nhân viên
          </Button>
        </Stack>

        <Card>
          <StaffListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onOpenModal={() => setOpenConfirmDeleteSelected(true)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <StaffListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={staffs.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staff) => {
                    const { _id, name, role, status, gender, birthday } = staff;
                    const isSelected = selected.findIndex((item) => item._id === _id) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} onChange={(event) => handleClick(event, staff)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{role.name}</TableCell>

                        <TableCell align="center">{gender}</TableCell>

                        <TableCell align="center">{new Date(birthday).toLocaleDateString()}</TableCell>

                        <TableCell align="center">
                          <Label color={(status === 'Đã nghỉ' && 'error') || 'success'}>{status}</Label>
                        </TableCell>

                        <TableCell align="center">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, staff)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không tìm thấy nhân viên nào tên &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Vui lòng kiểm tra lại tên nhân viên.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={staffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem>
          <Link to={`/staffs/edit/${currentStaff?._id}`} state={currentStaff}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Edit
          </Link>
        </MenuItem> */}

        <MenuItem component={Link} to={`/staffs/edit/${currentStaff?._id}`} state={currentStaff}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => setOpenConfirmDeleteModal(true)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <ConfirmModal
        content="Bạn chắc chắn muốn xóa nhân viên?"
        open={openConfirmDeleteModal}
        handleClose={() => setOpenConfirmDeleteModal(false)}
        action={() => handleDeleteStaff(currentStaff._id)}
      />

      <ConfirmModal
        content="Bạn chắc chắn muốn xóa những nhân viên đã chọn?"
        open={openConfirmDeleteSelected}
        handleClose={() => setOpenConfirmDeleteSelected(false)}
        action={handleDeleteSelected}
      />
    </>
  );
}
