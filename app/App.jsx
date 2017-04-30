import React, { Component } from 'react';
import {scrape} from './services/scraper';
import style from './App.css';

export default class App extends Component {
  constructor(props, state) {
    super(props, state);

    this.state = {results: null}
  }

  componentDidMount() {
    scrape()
      .then(results => {
        this.setState({results})
      })
      .catch(error => {
        this.setState({ results: `${error.message}` });
      });
  }

  render() {
    return (
      <div className={style.normal}>
        {this.state.results}
      </div>
    );
  }
}
