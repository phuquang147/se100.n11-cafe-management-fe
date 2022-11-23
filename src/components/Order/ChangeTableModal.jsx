import { Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import Iconify from '~/components/UI/Iconify';
import SubTable from '~/components/Table/SubTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '100%',
    md: '90%',
  },
  height: {
    xs: '100%',
    md: '80%',
  },
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: {
    xs: '12px',
    md: 4,
  },
};

export default function ChangeTableModal({ isOpen, onCloseModal }) {
  return (
    <Modal
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Chuyển bàn / Gộp bàn</Typography>
          <IconButton onClick={onCloseModal}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>
        <Grid container spacing={3} mt={2}>
          {[...Array(3)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <SubTable />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Modal>
  );
}
