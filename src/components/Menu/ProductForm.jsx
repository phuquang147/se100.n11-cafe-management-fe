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
import Iconify from '~/components/UI/Iconify';
import { useState } from 'react';

const categories = ['Nước uống', 'Đồ ăn nhanh'];

export default function ProductForm({ data = {} }) {
  const { name, price } = data;
  const [filename, setFilename] = useState('');

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên món'),
    price: Yup.number().required().typeError('Vui lòng nhập giá').min(0, 'Giá phải lớn hơn 0'),
  });

  const defaultValues = {
    name,
    price,
    category: categories[0],
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

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    const uploadedFilename = e.target.files[0].name;
    setFilename(uploadedFilename);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Tên món" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="price" label="Giá" />
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

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ mt: 2 }}
        alignItems={{ xs: 'unset', md: 'center' }}
        columnGap={2}
      >
        <Typography variant="body1">Hình ảnh</Typography>
        <Button variant="outlined" component="label" sx={{ py: 2, mt: { xs: 1, md: 0 } }}>
          <Iconify icon="heroicons:photo" width={30} height={30} />
          <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
          {filename && (
            <Typography sx={{ ml: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {filename}
            </Typography>
          )}
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {Object.keys(data).length === 0 ? 'Tạo mới' : 'Cập nhật'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
