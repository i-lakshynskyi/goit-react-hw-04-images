import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './image-gallary-item.module.scss';

class ImageGalleryItem extends Component {

  static propTypes = {
    imgURL: PropTypes.string || null,
    user: PropTypes.string || null,
    onOpenModal: PropTypes.func,
  }

  render() {
    const { imgURL, user, onOpenModal } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img className={s.ImageGalleryItemImage}
             src={imgURL} alt={user} onClick={onOpenModal} />
      </li>
    );
  }
}

export default ImageGalleryItem;
