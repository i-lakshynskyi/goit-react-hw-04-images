import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  static propTypes = {
    onClose: PropTypes.func,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape'){
      this.props.onClose();
    }
  }

  render() {
    const {onClose} = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={onClose}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
