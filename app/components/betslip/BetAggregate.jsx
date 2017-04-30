import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {autobind} from 'core-decorators';
import {entries} from '../../services/utils';
import {gotoMatchPage} from '../../services/scraper';

const styles = {fontSize: '11px'};
const colStyle = Object.assign({width: '160px'}, styles);

export default class BetAggregate extends Component {
  @autobind
  onRowClick(_, __, event) {
    const {aggregates} = this.props;
    const columnText = event.target.textContent;

    gotoMatchPage(aggregates[columnText].matchLinkName)
  }

  renderBody() {
    const {aggregates} = this.props;

    return [...entries(aggregates)]
      .map(([key, value]) => (
         <TableRow >
            <TableRowColumn style={colStyle} title={key}>{value.matchLinkName}</TableRowColumn>
            <TableRowColumn style={{width: '75px', fontSize: '11px'}} title={value.betType}>{value.betType}</TableRowColumn>
            <TableRowColumn style={{width: '75px', fontSize: '11px'}} title={value.betMarket}>{value.betMarket}</TableRowColumn>
            <TableRowColumn style={styles}>{value.stake}</TableRowColumn>
            <TableRowColumn style={styles}>{value.returnValue}</TableRowColumn>
            <TableRowColumn style={styles}>{value.matchTime}</TableRowColumn>
            <TableRowColumn style={styles}>{value.matchScore}</TableRowColumn>
          </TableRow>
      ));
  }

  renderTable() {
    return (
       <Table onCellClick={this.onRowClick} >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={colStyle}>Game</TableHeaderColumn>
            <TableHeaderColumn style={{width: '75px', fontSize: '11px'}}>BetType</TableHeaderColumn>
             <TableHeaderColumn style={{width: '75px', fontSize: '11px'}}>BetMarket</TableHeaderColumn>
            <TableHeaderColumn style={styles}>Stake</TableHeaderColumn>
            <TableHeaderColumn style={styles}>Return</TableHeaderColumn>
            <TableHeaderColumn style={styles}>Time</TableHeaderColumn>
            <TableHeaderColumn style={styles}>Score</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
          {this.renderBody()}
        </TableBody>
      </Table>
    );
  }

  render() {
    const {aggregates, error} = this.props;
    if(error) {
      return <p>{error}</p>
    }
    else if(aggregates) {
      return this.renderTable();
    }
    else {
      return null;
    }
  }
}
