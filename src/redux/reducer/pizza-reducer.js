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

  //!! Сортировка с использование json-server
  // axios
  //   .get(
  //     `http://localhost:3001/pizzas?${
  //       category !== null ? `category=${category}` : ''
  //     }&_sort=${sort}&_order=asc`,
  //   )
  //   .then(({ data }) => {
  //     dispatch(setItemsPizzaAC(data));
  //   });

  //Сортировка с использование firebase
  axios.get('https://pizza-on-re-default-rtdb.firebaseio.com/pizzas.json').then(({ data }) => {
    const response = data
      .filter(item => (category !== null ? item.category === category : item))
      .sort((a, b) => {
        switch (a[sort]) {
          case a.name:
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
          case a.rating:
            return b[sort] - a[sort];
          case a.price:
            return a[sort] - b[sort];
          default:
            break;
        }
      });
    dispatch(setItemsPizzaAC(response));
  });
};

export default pizzaReducer;

//==========================================================================================================
