import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import Iconify from '~/components/UI/Iconify';
// services
import { changePassword } from '~/services/authServices';

export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const onSubmit = async () => {
    const { password } = getValues();
    const accountId = Cookies.get('accountId');

    try {
      const res = await changePassword({
        password,
        passwordToken: token,
        accountId,
      });

      if (res.status === 201) {
        toast.success('Thay đổi mật khẩu thành công');
        navigate('/login');
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
        Xác nhận
      </LoadingButton>
    </FormProvider>
  );
}
