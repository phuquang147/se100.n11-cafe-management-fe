import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  Card,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
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
  p: {
    xs: '12px',
    md: 4,
  },
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

export default function ChooseFoodModal({ isOpen, onCloseModal }) {
  const [value, setValue] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const styles = useStyles();
  const theme = useTheme();

  const childRefs = React.useMemo(() => [...Array(12)].map(() => React.createRef()), []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectFood = (food) => {
    const updatedFoods = [...selectedFoods, food];
    setSelectedFoods(updatedFoods);
  };

  const handleDeleteFood = (foodIndex) => {
    const updatedFoods = selectedFoods.filter((food, index) => index !== foodIndex);
    setSelectedFoods(updatedFoods);
  };

  const handleDeleteAll = () => {
    setSelectedFoods([]);
  };

  const handleChangeQuantity = (index, type) => {
    let quantity;
    if (type === 'increase') {
      quantity = +childRefs[index].current.innerText + 1;
    } else {
      quantity = +childRefs[index].current.innerText - 1;
    }

    if (quantity === 0) {
      handleDeleteFood(index);
    } else {
      childRefs[index].current.innerText = quantity;
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Chọn món</Typography>
          <IconButton onClick={onCloseModal}>
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
                {[...Array(10)].map((_, index) => (
                  <Grid key={index} item xs={6} md={4}>
                    <Product onSelect={handleSelectFood} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <Product onSelect={handleSelectFood} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Product onSelect={handleSelectFood} />
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Hóa đơn</Typography>
              <Button onClick={handleDeleteAll}>Xoá tất cả</Button>
            </Stack>
            {selectedFoods.length > 0 && (
              <Box sx={{ maxHeight: '600px', overflowY: 'auto', p: '2px' }}>
                <Stack direction="column" spacing={1}>
                  {selectedFoods.map((item, index) => (
                    <Card sx={{ p: 1 }} key={index}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', borderRadius: '10px' }}
                          />
                          <Stack direction="column" spacing="6px">
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="subtitle2">{item.price}</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <IconButton
                                size="small"
                                color="primary"
                                sx={{ border: '1px solid #ffa16c' }}
                                onClick={() => {
                                  handleChangeQuantity(index, 'decrease');
                                }}
                              >
                                <Iconify icon="akar-icons:minus" width={12} height={12} color="#ffa16c" />
                              </IconButton>
                              <Typography
                                ref={childRefs[index]}
                                sx={{ display: 'inline', fontSize: '16px', fontWeight: '700' }}
                              >
                                1
                              </Typography>
                              <IconButton
                                size="small"
                                color="primary"
                                sx={{ border: '1px solid #ffa16c' }}
                                onClick={() => {
                                  handleChangeQuantity(index, 'increase');
                                }}
                              >
                                <Iconify icon="akar-icons:plus" width={12} height={12} color="#ffa16c" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Stack>
                        <IconButton onClick={() => handleDeleteFood(index)}>
                          <Iconify
                            icon="bxs:trash-alt"
                            sx={{ width: '20px', height: '20px', color: theme.palette.primary.main }}
                          />
                        </IconButton>
                      </Stack>
                    </Card>
                  ))}
                  <Button variant="contained" sx={{ height: '40px' }}>
                    Đặt bàn
                  </Button>
                </Stack>
              </Box>
            )}
            {selectedFoods.length === 0 && (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 6 }}>
                Chưa có món nào được chọn
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
