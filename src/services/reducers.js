export const priceReducer = (state, action) => {
  switch (action.type) {
    case 'addIngredient':
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload
      };
    case 'deleteIngredient':
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload
      };
    case 'reset':
      return {
        ...state,
        totalPrice: 0
      };
    default:
      return state;
  }
};
