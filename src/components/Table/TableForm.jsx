import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';

export default function TableForm() {
  const TableSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên bàn'),
    capacity: Yup.number()
      .required()
      .typeError('Vui lòng nhập số khách')
      .positive('Số khách phải là số dương')
      .min(1, 'Số khách phải lớn hơn 1'),
  });

  const defaultValues = {
    name: '',
    capacity: 1,
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
    console.log(values);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Tên bàn" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="capacity" label="Số khách tối đa" type="number" />
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
