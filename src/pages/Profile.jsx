import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Container, Grid, Stack, Typography, useTheme } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';

import { useLocation, useNavigate } from 'react-router';
import RHFDatePicker from '~/components/hook-form/RHFDatePicker';
import { toast } from 'react-toastify';
import ResetPasswordModal from '~/components/Auth/ResetPasswordModal';
import { useState } from 'react';
import { editStaff } from '~/services/staffServices';
import { useDispatch } from 'react-redux';
import { setUser } from '~/redux/dataSlice';

const GENDERS = ['Nam', 'Nữ'];

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = location.state;

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    gender: Yup.string().required('Vui lòng chọn giới tính'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    birthday: Yup.date(),
  });

  //   console.log(compareSync('111111', user.account.password));
  const defaultValues = {
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    gender: user.gender || GENDERS[0],
    address: user.address || '',
    birthday: user.birthday || new Date(),
  };

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const updatedStaff = { ...values, role: user.role.name, _id: user._id };
      const staffRes = await editStaff(updatedStaff);
      const { status, data } = staffRes;

      if (status === 201) {
        toast.success(data.message);
        dispatch(setUser(data.user));
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Thông tin tài khoản
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
          gutterBottom
          onClick={() => setOpenModal(true)}
        >
          Đổi mật khẩu
        </Typography>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="name" label="Họ tên" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="email" label="Email" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="phone" label="Số điện thoại" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="gender"
              label="Giới tính"
              options={GENDERS}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="address" label="Địa chỉ" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker name="birthday" label="Ngày sinh" />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>

      <ResetPasswordModal isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
    </Container>
  );
}
