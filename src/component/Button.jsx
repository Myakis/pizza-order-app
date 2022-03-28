import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function Button({ children, outline, className }) {
  return (
    <button
      href='/cart.html'
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}

//Задаем строгую типизацию

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export default Button;
