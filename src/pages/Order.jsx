import { Box, Button, Grid, IconButton, Modal, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Product from '~/components/Home/Product';
import Iconify from '~/components/UI/Iconify';

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
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  textField: {
    '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
      width: '100%',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function Order() {
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [value, setValue] = useState(0);
  const styles = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = () => {
    setOpenFoodModal(true);
  };

  const handleCloseModal = () => {
    setOpenFoodModal(false);
  };

  return (
    <div>
      <Typography>Chọn bàn</Typography>
      <Button onClick={handleOpenModal}>Bàn 1</Button>
      <Modal
        open={openFoodModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Chọn món</Typography>
            <IconButton onClick={handleCloseModal}>
              <Iconify icon="ep:close" width={24} height={24} />
            </IconButton>
          </Stack>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Cà phê" />
                    <Tab label="Đồ ăn nhẹ" />
                  </Tabs>
                </Grid>
                <Grid item xs={12} md={6} className={styles.textField}>
                  <TextField variant="outlined" placeholder="Tìm kiếm" />
                </Grid>
              </Grid>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Product />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Product />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Product />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Product />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Product />
                  </Grid>
                </Grid>
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
