import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, SortPopup } from '../../component';
import { setCategoryrOnAC } from '../../redux/reducer/filter-reducer';

import PizzaCard from '../PizzaCard';

const categoriesName = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = ['популярности', 'цене', 'алфавиту'];

function Home() {
  //достаем нужные значения из state(аналог HOC connect, только на хуках)
  const items = useSelector(state => state.pizza.items);
  const dispatch = useDispatch();
  //Оборачиваем в колбэк, функция не перерендеривалась каждый раз
  const onClickCategory = React.useCallback(name => {
    dispatch(setCategoryrOnAC(name));
  }, []);

  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories onClickCategory={onClickCategory} items={categoriesName} />
          <SortPopup items={sortItems} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items d-grid'>
          {items.map(data => {
            return <PizzaCard key={data.id} {...data} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
