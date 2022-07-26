import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import s from './image-gallery.module.scss';

const ImageGallery = ({ images, onOpenModal, onCloseModal, showModal, currentLargeImageURL, currentUser }) => {

  return (
    <React.Fragment>
      <ul className={s.ImageGallery}>
        {
          images?.map(({ id, webformatURL, user }) =>
            <ImageGalleryItem key={id} imgURL={webformatURL} user={user} onOpenModal={() => onOpenModal(id)} />,
          )
        }
      </ul>
      {showModal &&
        <Modal onClose={onCloseModal}>
          <ImageGalleryItem imgURL={currentLargeImageURL} user={currentUser} />
        </Modal>
      }
    </React.Fragment>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    user: PropTypes.string,
  })).isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  currentLargeImageURL: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};
export default ImageGallery;
