import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {scrape} from './services/scraper';
import BetAggregate from './components/betslip/BetAggregate';
import style from './App.css';

export default class App extends Component {
  constructor(props, state) {
    super(props, state);

    this.state = {aggregates: null, error: ''};
  }

  componentDidMount() {
    scrape()
      .then(aggregates => {
        this.setState({aggregates})
      })
      .catch(error => {
        this.setState({ error: `${error.message}` });
      });
  }

  renderTabs() {
    const {aggregates, error} = this.state;

    return (
      <Tabs>
        <Tab label="My Bets">
          <BetAggregate aggregates={aggregates} error={error}/>
        </Tab>
      </Tabs>
    );
  }

  render() {
    return (
      <div className={style.normal}>
        {this.renderTabs()}
      </div>
    );
  }
}
