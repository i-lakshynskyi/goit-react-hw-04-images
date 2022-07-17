import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return function() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={onClose}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
};
export default Modal;
