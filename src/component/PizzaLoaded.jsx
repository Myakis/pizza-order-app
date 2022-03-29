import React from 'react';
import ContentLoader from 'react-content-loader';

function PizzaLoaded() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={457}
      viewBox='0 0 280 457'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      className='pizza-block'>
      <rect x='0' y='267' rx='5' ry='5' width='280' height='24' />
      <rect x='1' y='314' rx='7' ry='7' width='280' height='69' />
      <rect x='3' y='427' rx='5' ry='5' width='99' height='26' />
      <rect x='242' y='442' rx='0' ry='0' width='1' height='6' />
      <rect x='137' y='416' rx='11' ry='11' width='146' height='38' />
      <circle cx='137' cy='125' r='125' />
    </ContentLoader>
  );
}

export default PizzaLoaded;
