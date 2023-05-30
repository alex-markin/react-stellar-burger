
import { combineReducers } from 'redux';
import { priceSlice } from './price-slice';
import { ingredientsSlice } from './ingredients-slice';
import { dataSlice } from './data-slice';

export const rootReducer = combineReducers({
  price: priceSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  data: dataSlice.reducer
});
