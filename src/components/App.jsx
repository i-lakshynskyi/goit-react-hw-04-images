import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getImagesAPI } from '../api/api';

import s from './app.module.scss';


const App = () => {
  const [images, setImages] = useState([]);
  const [q, setQ] = useState('forest');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const per_page = 12;
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [currentUser, setCurrentUser] = useState('');


  useEffect(() => {
    setLoading(true);
    getImagesAPI(q, page, per_page)
      .then(req => {
        setImages([...images, ...req.data.hits]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, q]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSearch = (qValue) => {
    setQ(qValue);
    setPage(1);
    setImages([]);
  };

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

  const onCloseModal = (event) => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      setShowModal(!showModal);
    }
  };

  return (
    <div className={s.App}>
      <Searchbar onSearch={onSearch} />
      <ImageGallery images={images} onOpenModal={onOpenModal} onCloseModal={onCloseModal}
                    showModal={showModal} currentLargeImageURL={currentLargeImageURL}
                    currentUser={currentUser} />
      {images?.length > 0 &&
        <Button onLoadMore={onLoadMore} />
      }
      {loading &&
        <Modal>
          <Loader />
        </Modal>
      }
    </div>
  );
};

export default App;
