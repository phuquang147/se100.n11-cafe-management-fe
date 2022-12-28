import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import ResetForm from '../ForgotPassword/ResetForm';
import Iconify from '../UI/Iconify';

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

export default function ResetPasswordModal({ isOpen, onCloseModal }) {
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
        <ResetForm />
      </Box>
    </Modal>
  );
}
