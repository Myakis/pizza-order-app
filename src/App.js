import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './component';
import { Home, Cart } from './component/pages';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setItemsPizzaAC, setPizzas } from './redux/reducer/pizza-reducer';

function App() {
  return (
    <div>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
