import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import s from './image-gallery.module.scss';

class ImageGallery extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      user: PropTypes.string,
    })),
  }

  state = {
    showModal: false,
    currentLargeImageURL: null,
    currentUser: null,
  };

  onOpenModal = (id) => {
    const currentIMG = this.props.images?.reduce((acc, img) => {
      if (img.id === id) {
        acc['largeImageURL'] = img.largeImageURL;
        acc['user'] = img.user;
      }
      return acc;
    }, {});

    this.setState(({ showModal }) => ({
      currentLargeImageURL: currentIMG.largeImageURL,
      currentUser: currentIMG.user,
      showModal: !showModal,
    }));
  };

  onCloseModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };


  render() {
    const { images } = this.props;
    const { showModal, currentLargeImageURL, currentUser } = this.state;
    return (
      <React.Fragment>
        <ul className={s.ImageGallery}>
          {
            images?.map(({ id, webformatURL, user }) =>
              <ImageGalleryItem key={id} imgURL={webformatURL} user={user} onOpenModal={() => this.onOpenModal(id)} />,
            )
          }
        </ul>
        {showModal &&
          <Modal onClose={this.onCloseModal}>
            <ImageGalleryItem imgURL={currentLargeImageURL} user={currentUser} />
          </Modal>
        }
      </React.Fragment>
    );
  }
}

export default ImageGallery;
