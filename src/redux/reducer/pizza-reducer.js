const SET_ITEMS_PIZZA = 'SET_ITEMS_PIZZA';

//Инициализируем начальный state
const initialState = {
  items: [],
  isLoader: false,
};

//Редьюсер
const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS_PIZZA:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

//Action Creator
export const setItemsPizzaAC = payload => ({
  type: SET_ITEMS_PIZZA,
  payload,
});

export default pizzaReducer;
