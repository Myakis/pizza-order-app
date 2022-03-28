const SET_SORT_ON = 'SET_SORT_ON';
const SET_CATEGORY_ON = 'SET_CATEGORY_ON';

//Инициализируем начальный state
const initialState = {
  sort: 'popular',
  category: 0,
};

//Редьюсер
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_ON:
      return {
        ...state,
        sort: action.sort,
      };
    case SET_CATEGORY_ON:
      return {
        ...state,
        sort: action.category,
      };

    default:
      return state;
  }
};

//Action Creator
export const setSortrOnAC = sort => ({
  type: SET_SORT_ON,
  sort,
});
export const setCategoryrOnAC = category => ({
  type: SET_SORT_ON,
  category,
});

export default filterReducer;
