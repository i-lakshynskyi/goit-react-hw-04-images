import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './button.module.scss';

class Button extends Component {

  static propTypes = {
    onLoadMore: PropTypes.func,
  }

  render() {
    return (
      <div className={s.ButtonWrapper}>
        <button type={"button"} className={s.Button} onClick={this.props.onLoadMore}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
