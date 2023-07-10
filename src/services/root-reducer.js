
import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients-slice';
import { dataSlice } from './data-slice';
import { selectedIngredientSlice } from './selected-ingredient-slice';
import { orderSlice } from './order-slice';
import { tabsNavigationSlice } from './tabs-navigation-slice';
import { userAuthSlice } from './user-auth-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  data: dataSlice.reducer,
  selectedIngredient: selectedIngredientSlice.reducer,
  order: orderSlice.reducer,
  tabsNavigation: tabsNavigationSlice.reducer,
  userAuth: userAuthSlice.reducer
});
