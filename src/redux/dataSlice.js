import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  products: [],
  categories: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataStarted(state) {
      state.status = 'loading';
    },
    setDataSuccess(state, action) {
      const { products, categories } = action.payload;
      state.products = products;
      state.categories = categories;
      state.status = 'idle';
    },
    setDataFailed(state) {
      state.status = 'failed';
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const selectProducts = (state) => state.data.products;
export const selectCategories = (state) => state.data.categories;

export const { setDataStarted, setDataSuccess, setDataFailed, addProduct, setProducts } = dataSlice.actions;

export default dataSlice.reducer;
