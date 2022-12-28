import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Modal, Stack, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import Iconify from '~/components/UI/Iconify';
// services
import { changePassword } from '~/services/staffServices';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '70%',
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

export default function ResetPasswordModal({ isOpen, staffId, onCloseModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự').required('Vui lòng nhập mật khẩu'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string().test('isEqual', 'Vui lòng xác nhận lại mật khẩu', (value, testContext) => {
      if (testContext.parent.password !== value) return false;
      return true;
    }),
  });

  const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const onSubmit = async () => {
    const { oldPassword, password, confirmPassword } = getValues();

    console.log(password, confirmPassword, oldPassword);

    try {
      const res = await changePassword(
        {
          newPassword: password,
          confirmNewPassword: confirmPassword,
          oldPassword,
        },
        staffId,
      );

      if (res.status === 200) {
        toast.success('Thay đổi mật khẩu thành công');
        onCloseModal();
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (err) {
      toast.error(err.response.data.message);
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
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">Đổi mật khẩu</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField
              name="oldPassword"
              label="Mật khẩu cũ"
              type={showOldPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                      <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="password"
              label="Mật khẩu mới"
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

            <RHFTextField
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
      </Box>
    </Modal>
  );
}
