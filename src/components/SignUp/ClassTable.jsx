import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Pagination from 'material-ui-pagination';

import { getAllClasses } from './../../actions/data';

class ClassTable extends Component {
  constructor(props) {
    super(props);
    const { AllClasses } = props;
    this.state = {
      page: 1,
      total: Math.ceil(AllClasses.length/10),
    };
  }

  handlePaginationChange = (newPage) => {
    this.setState({
      page: newPage
    })
  }

  renderTable = () => {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Class Code</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.getRows() }
          </TableBody>
        </Table>
      </div>
    );
  }

  getRows = () => {
    const { AllClasses } = this.props;
    const { page } = this.state;
    const startIndex = ( page - 1) * 10;
    const endIndex = startIndex + 9;
    return AllClasses.slice(startIndex, endIndex).map((value, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{value.name}</TableRowColumn>
          <TableRowColumn>{value.class_code}</TableRowColumn>
        </TableRow>
      );
    })
  }

  render () {
    const { AllClasses } = this.props;
    return (
      <div>
        { this.renderTable() }
          <Pagination
            total={this.state.total}
            display={10}
            current={this.state.page}
            onChange={this.handlePaginationChange.bind(this)}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    AllClasses: state.data.AllClasses,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllClasses: getAllClasses,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassTable);
