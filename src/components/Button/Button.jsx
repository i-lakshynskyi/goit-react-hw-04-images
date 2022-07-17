import React from 'react';
import PropTypes from 'prop-types';

import s from './button.module.scss';

const Button = ({ onLoadMore }) => {
  return (
    <div className={s.ButtonWrapper}>
      <button type={'button'} className={s.Button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
export default Button;
