import classNames from 'classnames';
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

export default Button;
