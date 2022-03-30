const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';

//Инициализируем начальный state
const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

const summTotalPrice = arr => arr.reduce((summ, obj) => obj.price + summ, 0);

//Редьюсер
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_TO_CART:
      const currentPizzaItem = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const obj = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItem,
          totalPrice: summTotalPrice(currentPizzaItem),
          totalCount: 222,
        },
      };

      const newObj = Object.values(obj).map(obj => {
        return obj.items;
      });

      const allPizza = [].concat.apply([], newObj);
      const totalCount = allPizza.length;
      const totalPrice = summTotalPrice(allPizza);

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
