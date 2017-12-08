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
      selectedClasses: [],
    };
  }

  handleRowSelect = (rows) => {
    if (rows.length === 0) return;
    const { AllClasses } = this.props;
    let { page, total, selectedClasses } = this.state;
    let classes;
    const startIndex = ((page - 1) * 10);
    const endIndex = startIndex + 9;
    if (rows === 'all') {
      classes = AllClasses;
    } else if (rows === 'none') {
      this.state.selectedClasses = [];
      return;
    } else {
      classes = rows.map((row) => (AllClasses[row + ((page - 1) * 10)]));
      for (let i = startIndex; i < endIndex; i++) {
        const classObject = AllClasses[i];
        if (rows.indexOf(i) === -1 && selectedClasses.indexOf(classObject) !== -1) {
          const index = selectedClasses.indexOf(classObject);
          delete selectedClasses[index];
        }
      }
    }

    if(classes.length !== 0) {
      selectedClasses = selectedClasses.concat(classes);
      selectedClasses = selectedClasses.filter((val, i) => (selectedClasses.indexOf(val) == i))
      this.state.selectedClasses = selectedClasses;
    }
  }

  handlePaginationChange = (newPage) => {
    this.setState({
      page: newPage
    })
  }

  renderTable = () => {
    return (
      <div>
        <Table
          multiSelectable
          enableSelectAll
          onRowSelection={this.handleRowSelect}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Class Code</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows
            showRowHover
          >
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
