import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

//Оборачиваем в React.memo для оптимизации приложения,чтобы небыло ненужных рендеров
const SortPopup = React.memo(function SortPopup({ items }) {
  //Показывать ли фильтр
  const [visiblePopup, setVisiblePopup] = useState(false);
  //Активный элемент в филтре
  const [activeIem, setaAtiveItem] = useState(0);
  //Выбранный элемент в филтре
  const selectedItem = items[activeIem];
  //Привязываемся с блоку, который показывает список фильтров
  const refPopup = useRef();
  //Выбираем активный элемент и тоглим видимость фильтра
  const activeSortItem = index => {
    setaAtiveItem(index);
    setVisiblePopup(!visiblePopup);
  };

  //Тоглим видимость фильтра
  const toggleVisiblePopUp = () => {
    setVisiblePopup(!visiblePopup);
  };
  //Выключаем видимость фильтра при клике не на блоке с привязкой к useRef
  const visibiliteHiddenPopup = e => {
    if (!e.path.includes(refPopup.current)) {
      setVisiblePopup(visiblePopup);
    }
  };
  //Вешаем слушаете при монтировании и удаляем его при размонтировании
  useEffect(() => {
    window.addEventListener('click', visibiliteHiddenPopup);
    return () => {
      window.removeEventListener('click', visibiliteHiddenPopup);
    };
  }, []);

  return (
    <div className='sort' ref={refPopup}>
      <div className='sort__label'>
        <svg
          className={classNames({ rotated: visiblePopup })}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopUp}>{selectedItem}</span>
      </div>
      {visiblePopup && (
        <div className='sort__popup'>
          <ul>
            {items.map((item, index) => {
              return (
                <li
                  key={`${item}_${index}`}
                  onClick={() => activeSortItem(index)}
                  className={activeIem === index ? 'active' : ''}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
