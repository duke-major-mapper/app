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
    let selected = [];
    let deselected = [];
    const startIndex = ((page - 1) * 10);
    const endIndex = startIndex + 9;
    // Creating arrays for selected and deselected classes of each page
    rows.forEach((val) => {
      selected.push(AllClasses[val + startIndex]);
    });
    for (let i = startIndex; i < endIndex; i++) {
      if (selected.indexOf(AllClasses[i]) === -1) {
        deselected.push(AllClasses[i]);
      }
    }
    // Will change selectedClasses state value depending on selected and deselected
    for (let i = 0; i < selected.length; i++) {
      if (selectedClasses.indexOf(selected[i]) === -1) {
        selectedClasses.push(selected[i]);
        this.setState({ selectedClasses });
      }
    }
    for (let i = 0; i < deselected.length; i++) {
      const index = selectedClasses.indexOf(deselected[i]);
      if (index !== -1) {
        selectedClasses.splice(index, 1);
        this.setState({ selectedClasses });
      }
    }
    console.log(this.state.selectedClasses);
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
    const { page, selectedClasses } = this.state;
    const startIndex = ( page - 1) * 10;
    const endIndex = startIndex + 9;
    return AllClasses.slice(startIndex, endIndex).map((value, index) => {
      return (
        <TableRow
          key={index}
          selected={selectedClasses.indexOf(AllClasses[index + startIndex]) !== -1}
        >
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
        <div style={{ padding: '12px' }} >
          <Pagination
            total={this.state.total}
            display={10}
            current={this.state.page}
            onChange={this.handlePaginationChange.bind(this)}
          />
        </div>
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
