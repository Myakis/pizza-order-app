import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import filterReducer from './reducer/filter-reducer';
import pizzaReducer from './reducer/pizza-reducer';
import cartReducer from './reducer/cart-reducer';
//Комбайним редьюеры в один обьект-редьюсер
const rootReducer = combineReducers({
  filter: filterReducer,
  pizza: pizzaReducer,
  cart: cartReducer,
});

//
//Для работы с redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Создаем store на основе rootReducer
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
