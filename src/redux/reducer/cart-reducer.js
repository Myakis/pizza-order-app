const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';
const CLEAR_FULL_CART = 'CLEAR_FULL_CART';
const CLEAR_PIZZA = 'CLEAR_PIZZA';
const PLUS_PIZZA = 'PLUS_PIZZA';
const MINUS_PIZZA = 'MINUS_PIZZA';

//Инициализируем начальный state
const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

const summTotalPrice = arr => arr.reduce((summ, obj) => obj.price + summ, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

//Редьюсер
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    //Добавление пицц в корзину
    case ADD_PIZZA_TO_CART:
      const currentPizzaItem = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const obj = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItem,
          totalPrice: summTotalPrice(currentPizzaItem),
          totalCount: currentPizzaItem.length,
        },
      };

      const totalCount = getTotalSum(obj, 'items.length');
      const totalPrice = getTotalSum(obj, 'totalPrice');

      return {
        ...state,
        items: obj,
        totalCount,
        totalPrice,
      };
    //Полная очистка корзины
    case CLEAR_FULL_CART:
      return { ...state, items: {}, totalCount: 0, totalPrice: 0 };
    //Удаление группы пицц
    case CLEAR_PIZZA: {
      const newItems = {
        ...state.items,
      };
      const priceCurrentGroup = newItems[action.payload].totalPrice;
      const priceCountGroup = newItems[action.payload].items.length;

      //Удаляем из объекта объект групп пицц
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - priceCurrentGroup,
        totalCount: state.totalCount - priceCountGroup,
      };
    }

    //Добавить одну пиццу в опредленную группу
    case PLUS_PIZZA: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItemsPizza = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: summTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItemsPizza, 'items.length');
      const totalPrice = getTotalSum(newItemsPizza, 'totalPrice');
      return {
        ...state,
        items: newItemsPizza,
        totalPrice,
        totalCount,
      };
    }

    //Удалить одну пиццу в опредленную группу
    case MINUS_PIZZA: {
      const oldItems = state.items[action.payload].items;
      const newItemsPizza =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newItemsPizza,
          totalPrice: summTotalPrice(newItemsPizza),
        },
      };
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      return {
        ...state,
        items: newItems,
        totalPrice,
        totalCount,
      };
    }

    default:
      return state;
  }
};

//Action Creator возвращает action
export const addPizza = payload => ({
  type: ADD_PIZZA_TO_CART,
  payload,
});

export const clearCart = () => ({
  type: CLEAR_FULL_CART,
});
export const clearPizza = id => ({
  type: CLEAR_PIZZA,
  payload: id,
});

export const plusPizza = id => ({
  type: PLUS_PIZZA,
  payload: id,
});
export const minusPizza = id => ({
  type: MINUS_PIZZA,
  payload: id,
});

export default cartReducer;
