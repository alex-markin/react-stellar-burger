// для ревьюера: не совсем уверен, что правильно задавать все функции для useSelector тут, 
// но не нашёл информации, как лучше это организовать


export const getCurrentIngredients = (state) => state.ingredients;
export const getData = (state) => state.data;
export const getSelectedIngredient = (state) => state.selectedIngredient;
export const getCurrentOrder = (state) => state.order;
export const getTabsNavigation = (state) => state.tabsNavigation;