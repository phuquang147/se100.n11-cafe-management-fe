// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
// components
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import ProductItem from '../Product/ProductItem';
import { Fragment, useRef, useState } from 'react';
import { useMemo } from 'react';
import ProductTabs from '../Order/ProductTabs';
import Iconify from '../UI/Iconify';
import { toast } from 'react-toastify';
import { editReceipt } from '~/services/receiptServices';
import { useLocation, useNavigate } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '80%',
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

export default function BillForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { table, products, _id: receiptId } = location.state;
  const [selectedFoods, setSelectedFoods] = useState(products);
  const [isOpenFoodModal, setIsOpenFoodModal] = useState(false);

  const totalPriceRef = useRef();

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

  const handleDeleteFood = (foodIndex) => {
    const updatedFoods = selectedFoods.filter((food, index) => index !== foodIndex);
    setSelectedFoods(updatedFoods);
    handleTotalPrice(updatedFoods);
  };

  const handleSelectFood = (food) => {
    const updatedFoods = [...selectedFoods];
    const existingFoodIndex = selectedFoods.findIndex(
      (item) => item?.product?._id === food._id || item._id === food._id,
    );
    if (existingFoodIndex >= 0) {
      updatedFoods[existingFoodIndex].quantity++;
    } else {
      updatedFoods.push(food);
    }
    setSelectedFoods(updatedFoods);
    handleTotalPrice(updatedFoods);
    toast.success('Thêm món thành công');
  };

  const handleTotalPrice = (foods) => {
    const totalPrice = foods.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    if (totalPriceRef.current) {
      totalPriceRef.current.innerText = printNumberWithCommas(totalPrice) + ' VNĐ';
    }
  };

  const handleEditBill = async () => {
    const formattedFoods = selectedFoods.map((food) => ({
      name: food.name,
      price: food.price,
      quantity: food.quantity,
      product: food?.product?._id || food._id,
    }));

    try {
      const receiptRes = await editReceipt(receiptId, formattedFoods);
      if (receiptRes.status === 201) {
        toast.success(receiptRes.data.message);
        navigate('/bills');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const total = useMemo(
    () =>
      selectedFoods.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0),
    [selectedFoods],
  );

  return (
    <Box>
      <Typography variant="h4">{table}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 3 }}>
        <Typography>Các món đã chọn</Typography>
        <Button onClick={() => setIsOpenFoodModal(true)}>Thêm món</Button>
      </Stack>

      <Grid container spacing={2}>
        {selectedFoods.map((product, index) => (
          <Fragment key={index}>
            {product.quantity > 0 && (
              <Grid key={index} item xs={12} sm={6}>
                <ProductItem
                  item={product}
                  onDelete={() => handleDeleteFood(index)}
                  onChangeQuantity={(type) => handleChangeQuantity(index, type)}
                />
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
      {selectedFoods.length === 0 && (
        <Typography textAlign="center" sx={{ my: 3 }}>
          Chưa có món nào được chọn
        </Typography>
      )}

      {total > 0 && (
        <Stack direction="row" alignItems="center" justifyContent="end" spacing={3} sx={{ mt: 3 }}>
          <Typography variant="h6">Tổng:</Typography>
          <Typography ref={totalPriceRef} variant="h6">
            {printNumberWithCommas(total)} VNĐ
          </Typography>
        </Stack>
      )}

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          disabled={selectedFoods.length === 0}
          onClick={handleEditBill}
        >
          Cập nhật
        </LoadingButton>
      </Stack>

      <Modal
        open={isOpenFoodModal}
        onClose={() => setIsOpenFoodModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4">Chọn món</Typography>
            <IconButton onClick={() => setIsOpenFoodModal(false)}>
              <Iconify icon="ep:close" width={24} height={24} />
            </IconButton>
          </Stack>
          <ProductTabs onSelect={handleSelectFood} />
        </Box>
      </Modal>
    </Box>
  );
}
