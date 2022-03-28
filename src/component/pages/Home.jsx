import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Categories, SortPopup } from '../../component';
import { setSortrOnAC } from '../../redux/reducer/filter-reducer';
import { setItemsPizzaAC } from '../../redux/reducer/pizza-reducer';
import PizzaCard from '../PizzaCard';

// function Home() {
//   let [pizzaData, setPizzaData] = useState('');

//   useEffect(() => {
//     axios.get('https://pizza-on-re-default-rtdb.firebaseio.com/pizzas.json').then(response => {
//       setPizzaData(response.data);
//     });
//   }, []);

//   return (
//     <div className='content'>
//       <div className='container'>
//         <div className='content__top'>
//           <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
//           <SortPopup items={['популярности', 'цене', 'алфавиту']} />
//         </div>
//         <h2 className='content__title'>Все пиццы</h2>
//         <div className='content__items d-grid'>
//           {pizzaData &&
//             pizzaData.map(data => {
//               return <PizzaCard key={data.id} {...data} />;
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }

class Home extends React.Component {
  componentDidMount() {
    axios.get('https://pizza-on-re-default-rtdb.firebaseio.com/pizzas.json').then(response => {
      this.props.setItemsPizzaAC(response.data);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']} />
            <SortPopup items={['популярности', 'цене', 'алфавиту']} />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items d-grid'>
            {this.props.pizza.items.map(data => {
              return <PizzaCard key={data.id} {...data} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter,
    pizza: state.pizza,
  };
};

export default connect(mapStateToProps, {
  setSortrOnAC,
  setItemsPizzaAC,
})(Home);
