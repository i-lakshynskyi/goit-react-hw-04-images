import React, { useState, useEffect } from 'react';
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
  const [per_page, setPer_Page] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!images) {
      getImagesAPI(q, page, per_page)
        .then(req => {
          setImages(req.data.hits);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);


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
  }, [page]);

  useEffect(() => {
    setLoading(true);
    getImagesAPI(q, page, per_page)
      .then(req => {
        setImages(req.data.hits);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q]);


  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSearch = (qValue) => {
    setQ(qValue);
    setPage(1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSearch={onSearch} />
      <ImageGallery images={images} />
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
