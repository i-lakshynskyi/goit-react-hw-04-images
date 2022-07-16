import React, { Component } from 'react';
import {ImSearch} from 'react-icons/im';
import PropTypes from 'prop-types';

import s from './searchbar.module.scss';

class Searchbar extends Component {

  static propTypes = {
    onSearch: PropTypes.func,
  }

  state = {
    searchValue: '',
  }

  onChangeSearch = (e) => {
    const inpValue = e.currentTarget.value;
    this.setState({searchValue: inpValue});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchValue);
  };

  render() {
    return (
      <div className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type='submit' className={s.SearchFormButton} title={"search"}>
            <span className={s.SearchFormButtonLabel}><ImSearch/></span>
          </button>

          <input
            className={s.SearchFormInput}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            value={this.state.searchValue}
            onChange={this.onChangeSearch}
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
