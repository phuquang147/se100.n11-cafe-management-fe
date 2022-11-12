import { Box, Button, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Iconify from '~/components/UI/Iconify';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import ProductItem from '../Product/ProductItem';
import ProductTabs from './ProductTabs';

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

export default function ChooseFoodModal({ isOpen, onCloseModal }) {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const totalPriceRef = useRef();

  const handleSelectFood = (food) => {
    console.log(food);
    const updatedFoods = [...selectedFoods];
    const existingFoodIndex = selectedFoods.findIndex((item) => item.id === food.id);
    if (existingFoodIndex >= 0) {
      updatedFoods[existingFoodIndex].quantity++;
    } else {
      updatedFoods.push(food);
    }
    setSelectedFoods(updatedFoods);
    if (updatedFoods.length >= 1) {
      handleTotalPrice(updatedFoods);
    }
  };

  const handleDeleteFood = (foodIndex) => {
    const updatedFoods = selectedFoods.filter((food, index) => index !== foodIndex);
    setSelectedFoods(updatedFoods);
    handleTotalPrice(updatedFoods);
  };

  const handleDeleteAll = () => {
    if (selectedFoods.length > 0) {
      setSelectedFoods([]);
    }
  };

  const handleChangeQuantity = (index, type) => {
    const updatedFoods = [...selectedFoods];
    if (type === 'increase') {
      updatedFoods[index].quantity++;
    } else {
      updatedFoods[index].quantity--;
    }

    if (updatedFoods[index].quantity === 0) {
      handleDeleteFood(index);
    } else {
      setSelectedFoods(updatedFoods);
      handleTotalPrice(updatedFoods);
    }
  };

  const handleTotalPrice = (foods) => {
    const totalPrice = foods.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    if (totalPriceRef.current) {
      totalPriceRef.current.innerText = printNumberWithCommas(totalPrice) + ' VNĐ';
    }
  };

  const handleOrder = () => {
    toast.success('Đặt bàn thành công');
    handleDeleteAll();
    onCloseModal();
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
            <ProductTabs onSelect={handleSelectFood} />
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
                    <ProductItem
                      key={index}
                      item={item}
                      onChangeQuantity={(type) => handleChangeQuantity(index, type)}
                      onDelete={() => handleDeleteFood(index)}
                    />
                  ))}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">Tổng</Typography>
                    <Typography ref={totalPriceRef}>{printNumberWithCommas(selectedFoods[0].price)} VNĐ</Typography>
                  </Stack>
                  <Button variant="contained" sx={{ height: '40px' }} onClick={handleOrder}>
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
