import React, { useState } from 'react';
import {ImSearch} from 'react-icons/im';
import PropTypes from 'prop-types';

import s from './searchbar.module.scss';

const Searchbar = ({onSearch}) => {
  const[searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    const inpValue = e.currentTarget.value;
    setSearchValue(inpValue);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };


    return (
      <div className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={onSubmit}>
          <button type='submit' className={s.SearchFormButton} title={"search"}>
            <span className={s.SearchFormButtonLabel}><ImSearch/></span>
          </button>

          <input
            className={s.SearchFormInput}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            value={searchValue}
            onChange={onChangeSearch}
          />
        </form>
      </div>
    );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func,
}
export default Searchbar;
