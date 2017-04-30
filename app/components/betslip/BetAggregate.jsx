import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {entries} from '../../services/utils';

export default class BetAggregate extends Component {
  renderBody() {
    const {aggregates} = this.props;

    return [...entries(aggregates)]
      .map(([key, value]) => (
         <TableRow>
            <TableRowColumn>{key}</TableRowColumn>
            <TableRowColumn>{value.betType}</TableRowColumn>
            <TableRowColumn>{value.stake}</TableRowColumn>
            <TableRowColumn>{value.returnValue}</TableRowColumn>
            <TableRowColumn>{value.matchTime}</TableRowColumn>
            <TableRowColumn>{value.matchScore}</TableRowColumn>
          </TableRow>
      ));
  }

  renderTable() {
    return (
       <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Game</TableHeaderColumn>
            <TableHeaderColumn>BetType</TableHeaderColumn>
            <TableHeaderColumn>Stake</TableHeaderColumn>
            <TableHeaderColumn>Return</TableHeaderColumn>
            <TableHeaderColumn>MatchTime</TableHeaderColumn>
            <TableHeaderColumn>MatchScore</TableHeaderColumn>
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
