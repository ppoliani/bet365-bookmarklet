import React, { Component, PropTypes } from 'react';
import style from './App.css';

export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { todos, actions } = this.props;

    return (
      <div className={style.normal}>
        Home Page
      </div>
    );
  }
}
