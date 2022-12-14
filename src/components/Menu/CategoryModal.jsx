import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createCategory, updateCategory } from '~/services/categoryServices';
import { addCategory, updateCategory as updateExistingCategory } from '~/redux/dataSlice';
import FormProvider from '../hook-form/FormProvider';
import RHFTextField from '../hook-form/RHFTextField';
import Iconify from '../UI/Iconify';

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

export default function CategoryModal({ type, isOpen, category, onCloseModal }) {
  const dispatch = useDispatch();

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên bàn'),
  });

  const defaultValues = {
    name: category?.name || '',
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { name } = values;
    try {
      if (type === 'new') {
        const categoryRes = await createCategory(name);
        if (categoryRes.status === 201) {
          toast.success(categoryRes.data.message);
          dispatch(addCategory(categoryRes.data.category));
          onCloseModal();
        }
        return;
      }

      const categoryRes = await updateCategory({ name }, category._id);
      if (categoryRes.status === 201) {
        toast.success(categoryRes.data.message);
        dispatch(updateExistingCategory({ name, id: category._id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">{type === 'new' ? 'Thêm danh mục' : 'Chỉnh sửa danh mục'}</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFTextField name="name" label="Tên danh mục" />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                {type === 'new' ? 'Tạo mới' : 'Xác nhận'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Modal>
  );
}
