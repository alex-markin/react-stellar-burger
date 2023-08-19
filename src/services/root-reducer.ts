
import { combineReducers } from 'redux';
import { ingredientsSlice } from './ingredients-slice';
import { dataSlice } from './data-slice';
import { selectedIngredientSlice } from './selected-ingredient-slice';
import { orderSlice } from './order-slice';
import { tabsNavigationSlice } from './tabs-navigation-slice';
import { userAuthSlice } from './user-auth-slice';
import { ordersReducer } from './socket-connection/reducer';
import { orderDetailsSlice } from './order-details-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  data: dataSlice.reducer,
  selectedIngredient: selectedIngredientSlice.reducer,
  order: orderSlice.reducer,
  tabsNavigation: tabsNavigationSlice.reducer,
  userAuth: userAuthSlice.reducer,
  orders: ordersReducer,
  orderDetails: orderDetailsSlice.reducer,

});

type IngredientsState = ReturnType<typeof ingredientsSlice.reducer>;
type DataState = ReturnType<typeof dataSlice.reducer>;
type SelectedIngredientState = ReturnType<typeof selectedIngredientSlice.reducer>;
type OrderState = ReturnType<typeof orderSlice.reducer>;
type TabsNavigationState = ReturnType<typeof tabsNavigationSlice.reducer>;
type UserAuthState = ReturnType<typeof userAuthSlice.reducer>;
type OrdersState = ReturnType<typeof ordersReducer>;
type OrderDetailsState = ReturnType<typeof orderDetailsSlice.reducer>;
