import React, { useState } from 'react';

//Оборачиваем в React.memo для оптимизации приложения,чтобы небыло ненужных рендеров
const Categories = React.memo(function Categories({ items, onClickCategory }) {
  const [activeItem, setActiveItem] = useState(null);

  const changeCategory = index => {
    setActiveItem(index);
    onClickCategory(index);
  };
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
                    changeCategory(index);
                  }}>
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
});
export default Categories;
