import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  products: [],
  categories: [],
  user: {
    name: '',
    email: '',
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataStarted(state) {
      state.status = 'loading';
    },
    setDataSuccess(state, action) {
      const { products, categories, user } = action.payload;
      state.products = products;
      state.categories = categories;
      state.user = user;
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
    updateCategory(state, action) {
      const { name, id } = action.payload;
      const updatedCategories = [...state.categories];
      const existingCategoryIndex = state.categories.findIndex((category) => category._id === id);
      if (existingCategoryIndex >= 0) {
        updatedCategories[existingCategoryIndex].name = name;
      }
    },
  },
});

export const selectProducts = (state) => state.data.products;
export const selectCategories = (state) => state.data.categories;
export const selectUser = (state) => state.data.user;

export const { setDataStarted, setDataSuccess, setDataFailed, addProduct, setProducts, updateCategory } =
  dataSlice.actions;

export default dataSlice.reducer;
