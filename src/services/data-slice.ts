import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkResponse } from '../utils/check-response';
import { Item, Data } from '../utils/types';
import { AppThunk } from './store';

type DataState = {
  data: Item[],
  loading: boolean,
  error: string | null
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null
};


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchIngredientsSuccess: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchIngredientsFailure: (state, action: PayloadAction<string>) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  fetchIngredientsFailure,
} = dataSlice.actions;




export const fetchData = (url: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(fetchIngredientsRequest());

    const response = await fetch(`${url}/ingredients`);
    const data: Data = await checkResponse(response);

    dispatch(fetchIngredientsSuccess(data.data));
    localStorage.setItem('ingredients', JSON.stringify(data.data));
  } catch (error: any) {
    dispatch(fetchIngredientsFailure(error.toString()));
  }
};

