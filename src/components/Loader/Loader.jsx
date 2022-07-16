import React, { Component } from 'react';
import s from './loader.module.scss';

class Loader extends Component {
  render() {
    return (
      <div className={s.loader}></div>
    );
  }
}

export default Loader;
