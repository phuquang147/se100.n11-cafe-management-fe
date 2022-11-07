import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();

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
          <Grid container spacing={4} sx={{ mt: 3 }}>
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
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Product />
                  </Grid>
                </Grid>
              </TabPanel>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Hóa đơn</Typography>
                <Button>Xoá tất cả</Button>
              </Stack>
              <Box sx={{ maxHeight: '600px', overflowY: 'auto', p: '2px' }}>
                <Stack direction="column" spacing={1}>
                  {[...Array(1)].map((item, index) => (
                    <Card sx={{ p: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <img
                            src="https://product.hstatic.net/1000075078/product/1653291204_hi-tea-vai_0e8376fb3eec4127ba33aa47b8d2c723_large.jpg"
                            alt="product-img"
                            style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                          />
                          <Stack direction="column" spacing="6px">
                            <Typography variant="h6">Hi-Tea</Typography>
                            <Typography variant="subtitle2">20000 VNĐ</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <IconButton size="small" sx={{ border: '1px solid #ccc' }}>
                                <Iconify
                                  icon="akar-icons:minus"
                                  width={12}
                                  height={12}
                                  color={theme.palette.grey[500]}
                                />
                              </IconButton>
                              <Typography sx={{ display: 'inline', fontSize: '16px', fontWeight: '700' }}>1</Typography>
                              <IconButton size="small" color="primary" sx={{ border: '1px solid #ffa16c' }}>
                                <Iconify icon="akar-icons:plus" width={12} height={12} color="#ffa16c" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Stack>
                        <IconButton>
                          <Iconify
                            icon="bxs:trash-alt"
                            sx={{ width: '20px', height: '20px', color: theme.palette.primary.main }}
                          />
                        </IconButton>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
