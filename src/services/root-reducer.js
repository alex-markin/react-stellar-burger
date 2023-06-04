
import { combineReducers } from 'redux';
import { priceSlice } from './price-slice';
import { ingredientsSlice } from './ingredients-slice';
import { dataSlice } from './data-slice';
import { selectedIngredientSlice } from './selected-ingredient-slice';
import { orderSlice } from './order-slice';
import { tabsNavigationSlice } from './tabs-navigation-slice';

export const rootReducer = combineReducers({
  price: priceSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  data: dataSlice.reducer,
  selectedIngredient: selectedIngredientSlice.reducer,
  order: orderSlice.reducer,
  tabsNavigation: tabsNavigationSlice.reducer,
});
