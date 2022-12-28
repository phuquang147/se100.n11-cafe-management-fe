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
import RHFAutocomplete from '../hook-form/RHFAutocomplete';

import { useLocation, useNavigate } from 'react-router';
import RHFDatePicker from '../hook-form/RHFDatePicker';
import { createStaff, editStaff } from '~/services/staffServices';
import { toast } from 'react-toastify';

const ROLES = ['Quản lý', 'Nhân viên'];
const GENDERS = ['Nam', 'Nữ'];
const STATUSES = ['Đang làm', 'Đã nghỉ'];

export default function StaffForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const editMode = Object.keys(location.state || {}).length > 0;

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    gender: Yup.string().required('Vui lòng chọn giới tính'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    birthday: Yup.date(),
    role: Yup.string().required('Vui lòng chọn chức vụ'),
    status: Yup.string().required('Vui lòng chọn trạng thái'),
  });

  const defaultValues = {
    name: location?.state?.name || '',
    email: location?.state?.email || '',
    phone: location?.state?.phone || '',
    gender: location?.state?.gender || GENDERS[0],
    address: location?.state?.address || '',
    birthday: location?.state?.birthday || new Date(),
    role: location?.state?.role.name || ROLES[1],
    status: location?.state?.status || STATUSES[0],
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
      if (!editMode) {
        const staff = { ...values };
        const staffRes = await createStaff(staff);
        if (staffRes.status === 201) {
          toast.success(staffRes.data.message);
          navigate('/staffs');
        }
        return;
      }

      const updatedStaff = { ...values, _id: location.state._id };
      const staffRes = await editStaff(updatedStaff);
      if (staffRes.status === 201) {
        toast.success(staffRes.data.message);
        navigate('/staffs');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
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

        {editMode && (
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="status"
              label="Tình trạng"
              options={STATUSES}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="role"
            label="Chức vụ"
            options={ROLES}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {!editMode ? 'Tạo mới' : 'Cập nhật'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
