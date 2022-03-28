import React, { useState } from 'react';

function Categories({ items }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      <div className='categories'>
        <ul>
          <li
            className={activeItem == null ? 'active' : ''}
            onClick={() => {
              setActiveItem(null);
            }}>
            Все
          </li>
          {items &&
            items.map((item, index) => {
              return (
                <li
                  className={activeItem === index ? 'active' : ''}
                  key={`${item}_${index}`}
                  onClick={() => {
                    setActiveItem(index);
                  }}>
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Categories;
