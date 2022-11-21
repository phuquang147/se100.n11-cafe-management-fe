import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  products: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataStarted(state) {
      state.status = 'loading';
    },
    setDataSuccess(state, action) {
      const { products } = action.payload;
      state.products = products;
      state.status = 'idle';
    },
    setDataFailed(state) {
      state.status = 'failed';
    },
  },
});

export const selectProducts = (state) => state.data.products;

export const { setDataStarted, setDataSuccess, setDataFailed } = dataSlice.actions;

export default dataSlice.reducer;
