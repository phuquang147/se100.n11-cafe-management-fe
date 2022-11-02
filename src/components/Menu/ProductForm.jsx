import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import RHFAutocomplete from '../hook-form/RHFAutocomplete';
import Iconify from '~/components/Iconify';

const categories = ['Nước uống', 'Đồ ăn nhanh'];

export default function ProductForm() {
  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên món'),
  });

  const defaultValues = {
    name: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Tên món" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="description" label="Mô tả" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="category"
            label="Phân loại"
            options={categories}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      </Grid>

      <Stack direction="row" sx={{ mt: 2 }} alignItems="center" columnGap={2}>
        <Typography variant="body1">Hình ảnh</Typography>
        <Button variant="outlined" sx={{ py: 2 }}>
          <Iconify icon="heroicons:photo" width={30} height={30} />
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Tạo mới
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
