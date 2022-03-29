const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';

//Инициализируем начальный state
const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

//Редьюсер
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_TO_CART:
      const obj = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };
      const allPizza = [].concat.apply([], Object.values(obj));
      const totalCount = [].concat.apply([], Object.values(obj)).length;
      const totalPrice = allPizza.reduce((summ, obj) => obj.price + summ, 0);

      return {
        ...state,
        items: obj,
        totalCount,
        totalPrice,
      };

    default:
      return state;
  }
};

//Action Creator возвращает action
export const addPizza = payload => ({
  type: ADD_PIZZA_TO_CART,
  payload,
});

export default cartReducer;
