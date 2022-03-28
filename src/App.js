import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './component';
import { Home, Cart } from './component/pages';

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
