import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import FormProvider from '../hook-form/FormProvider';
import RHFTextField from '../hook-form/RHFTextField';
import Iconify from '../UI/Iconify';
import { updateTable } from '~/services/tableServices';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '50%',
    md: '40%',
  },
  maxHeight: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: {
    xs: '12px',
    md: 4,
  },
};

export default function TableFormModal({ table, isOpen, onCloseModal, onLoadTables }) {
  const TableSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên bàn'),
  });

  const defaultValues = {
    name: (table && table.name) || '',
  };

  const methods = useForm({
    resolver: yupResolver(TableSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    onCloseModal();
    try {
      const tableRes = await updateTable({ name: values.name }, table._id);

      if (tableRes.status === 201) {
        onLoadTables();
        return toast.success(tableRes.data.message);
      }

      toast.error(tableRes.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">{table ? 'Chỉnh sửa bàn' : 'Thêm bàn'}</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFTextField name="name" label="Tên bàn" />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                {table ? 'Cập nhật' : 'Tạo mới'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Modal>
  );
}
