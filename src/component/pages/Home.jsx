import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Categories, SortPopup } from '../../component';
import PizzaCard from '../PizzaCard';

function Home() {
  let [pizzaData, setPizzaData] = useState('');

  useEffect(() => {
    axios.get('https://pizza-on-re-default-rtdb.firebaseio.com/pizzas.json').then(response => {
      setPizzaData(response.data);
    });
  }, []);

  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
          <SortPopup items={['популярности', 'цене', 'алфавиту']} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items d-grid'>
          {pizzaData &&
            pizzaData.map(data => {
              return <PizzaCard key={data.id} {...data} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
