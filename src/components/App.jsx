import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getImagesAPI } from '../api/api';

import s from './app.module.scss';


class App extends Component {
  state = {
    images: null,
    q: 'forest',
    page: 1,
    per_page: 12,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    if (!this.state.images) {
      getImagesAPI(this.state.q, this.state.page, this.state.per_page)
        .then(req => {
          this.setState({ images: req.data.hits });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const flagMoreIMG = prevState.page !== this.state.page && this.state.images && prevState.q === this.state.q;
    const flagNewIMG = prevState.q !== this.state.q;

    if (flagMoreIMG) {
      this.setState({ loading: true });
      getImagesAPI(this.state.q, this.state.page, this.state.per_page)
        .then(req => {
          this.setState(({ images }) => ({
            images: [...images, ...req.data.hits],
          }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });

    } else if (flagNewIMG) {
      this.setState({ loading: true });
      getImagesAPI(this.state.q, this.state.page, this.state.per_page)
        .then(req => {
          this.setState({
            images: [...req.data.hits],
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onSearch = (qValue) => {
    this.setState({ q: qValue, page: 1 });
  };

  render() {
    const { images, loading } = this.state;
    console.log(images);
    return (
      <div className={s.App}>
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery images={images} />
        {images?.length > 0 &&
          <Button onLoadMore={this.onLoadMore} />
        }
        {loading &&
          <Modal>
            <Loader />
          </Modal>
        }
      </div>
    );
  }
}

export default App;
