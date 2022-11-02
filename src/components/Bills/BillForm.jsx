import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import RHFAutocomplete from '../hook-form/RHFAutocomplete';
import { faker } from '@faker-js/faker';

const tables = ['Bàn 1', 'Bàn 2', 'Bàn 3'];

export default function BillForm() {
  const BillSchema = Yup.object().shape({
    table: Yup.string().required('Vui lòng chọn bàn'),
    guests: Yup.number()
      .required()
      .typeError('Vui lòng nhập số khách')
      .positive('Số khách phải là số lớn hơn 0')
      .integer('Số khách phải là số nguyên'),
  });

  const defaultValues = {
    table: tables[0],
    guests: 1,
  };

  const methods = useForm({
    resolver: yupResolver(BillSchema),
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
          <RHFAutocomplete
            name="table"
            label="Bàn"
            options={tables}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="guests" label="Số khách" type="number" />
        </Grid>
      </Grid>

      <Typography sx={{ my: 3 }}>Các món đã chọn</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <img
                  src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                  alt="product-img"
                  style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '8px' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {faker.name.fullName()} x 2
                  </Typography>
                  <Typography variant="subtitle2">$42</Typography>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <img
                  src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                  alt="product-img"
                  style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '8px' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {faker.name.fullName()} x 2
                  </Typography>
                  <Typography variant="subtitle2">$42</Typography>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <img
                  src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                  alt="product-img"
                  style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '8px' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {faker.name.fullName()} x 2
                  </Typography>
                  <Typography variant="subtitle2">$42</Typography>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Tạo mới
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
