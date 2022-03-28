import { combineReducers, createStore } from 'redux';
import filterReducer from './reducer/filter-reducer';
import pizzaReducer from './reducer/pizza-reducer';

//Комбайним редьюеры в один обьект-редьюсер
const rootReducer = combineReducers({
  filter: filterReducer,
  pizza: pizzaReducer,
});

//Создаем store на основе rootReducer
const store = createStore(
  rootReducer,
  //Для работы с redux devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
