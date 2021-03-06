import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup } from '../../component';
import { setCategoryrOnAC, setSortrOnAC } from '../../redux/reducer/filter-reducer';
import { fetchPizzas } from '../../redux/reducer/pizza-reducer';
import { addPizza } from '../../redux/reducer/cart-reducer';
import PizzaCard from '../PizzaCard';
import PizzaLoaded from '../PizzaLoaded';

const categoriesName = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Необычный вкус'];
const sortItems = [
  { sort: 'популярности', type: 'rating' },
  { sort: 'цене', type: 'price' },
  { sort: 'алфавиту', type: 'name' },
];

function Home() {
  //достаем нужные значения из state(аналог HOC connect, только на хуках)
  const { items, isLoader } = useSelector(state => state.pizza);
  const { category, sort } = useSelector(state => state.filter);
  const pizzaItems = useSelector(state => state.cart.items);
  //Забираем функцию dispatch из store и присваиваем переменной()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPizzas(category, sort));
  }, [category, sort]);

  //Оборачиваем в колбэк, функция не перерендеривалась каждый раз
  const onClickCategory = useCallback(name => {
    dispatch(setCategoryrOnAC(name));
  }, []);

  const onClickSort = useCallback(name => {
    dispatch(setSortrOnAC(name));
  }, []);

  const onClickPizzaToCart = useCallback(obj => {
    dispatch(addPizza(obj));
  }, []);

  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories onClickCategory={onClickCategory} items={categoriesName} />
          <SortPopup onClickSort={onClickSort} items={sortItems} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items d-grid'>
          {isLoader
            ? items.map(data => {
                const countPizza = pizzaItems[data.id] && pizzaItems[data.id].items.length;
                return (
                  <PizzaCard
                    key={data.id}
                    {...data}
                    countPizza={countPizza}
                    onClickPizzaToCart={onClickPizzaToCart}
                  />
                );
              })
            : Array(12)
                .fill('')
                .map((item, index) => <PizzaLoaded key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
