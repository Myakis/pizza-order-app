import axios from 'axios';

const SET_ITEMS_PIZZA = 'SET_ITEMS_PIZZA';
const TOGGLE_IS_LOADER = 'TOGGLE_IS_LOADER';
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
        isLoader: true,
      };
    case TOGGLE_IS_LOADER:
      return {
        ...state,
        isLoader: action.payload,
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
export const toggleIsLoaded = payload => ({
  type: TOGGLE_IS_LOADER,
  payload,
});

//thunk
export const fetchPizzas = (category, sort) => dispatch => {
  dispatch(toggleIsLoaded(false));
  axios
    .get(
      `http://localhost:3001/pizzas?${
        category !== null ? `category=${category}` : ''
      }&_sort=${sort}&_order=asc`,
    )
    .then(({ data }) => {
      dispatch(setItemsPizzaAC(data));
    });
};

export default pizzaReducer;
