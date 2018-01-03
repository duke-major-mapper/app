import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

const cardStyles = {
  margin: '10px',
  padding: '10px',
};

class ReqsTable extends Component {
  renderTableContent = () => {
    const { reqs, majorID } = this.props;
    if (reqs[majorID]) {
      return reqs[majorID].map((value, index) => {
        const max = value.num_needed;
        const progressValue = (value.fulfilled < max ? value.fulfilled : max );
        return (
          <TableRow key={index}>
            <TableRowColumn>{value.description}</TableRowColumn>
            <TableRowColumn>
              <LinearProgress
                mode="determinate"
                color="green"
                max={max}
                value={progressValue}
                style={{
                  height: '1em'
                }}
              />
              {progressValue} out of {max} classes!
            </TableRowColumn>
          </TableRow>
        );
      })
    } else {
      return null;
    }
  }

  renderTable = () => {
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Requirement</TableHeaderColumn>
            <TableHeaderColumn>Progress</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {this.renderTableContent()}
        </TableBody>
      </Table>
    );
  }

  render () {
    return (
      <Card
        style={cardStyles}
      >
        <CardHeader
              title="Requirements Filled"
              actAsExpander={true}
              showExpandableButton={true}
        />
        <CardMedia
          expandable={true}
        >
          {this.renderTable()}
        </CardMedia>
      </Card>
    );
  }
}

export default ReqsTable;
