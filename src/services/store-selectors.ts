
import { RootState } from './store';

export const getCurrentIngredients = (state: RootState) => state.ingredients;
export const getData = (state: RootState) => state.data;
export const getSelectedIngredient = (state: RootState) => state.selectedIngredient;
export const getCurrentOrder = (state: RootState) => state.order;
export const getTabsNavigation = (state: RootState) => state.tabsNavigation;
export const getUserAuth = (state: RootState) => state.userAuth;
export const getOrders = (state: RootState) => state.orders;
export const getOrderDetails = (state: RootState) => state.orderDetails;


