import React, { useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import s from './image-gallery.module.scss';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const onOpenModal = (id) => {
    const currentIMG = images?.reduce((acc, img) => {
      if (img.id === id) {
        acc['largeImageURL'] = img.largeImageURL;
        acc['user'] = img.user;
      }
      return acc;
    }, {});

    setShowModal(!showModal);
    setCurrentLargeImageURL(currentIMG.largeImageURL);
    setCurrentUser(currentIMG.user);
  };

  const onCloseModal = () => {
    setShowModal(!showModal);
  };

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
  })),
};
export default ImageGallery;
