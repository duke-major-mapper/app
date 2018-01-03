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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Pagination from 'material-ui-pagination';

import { getAllClasses } from './../../actions/data';
import { changeTakenClasses, updateMyClasses } from './../../actions/user';

class ClassTable extends Component {
  constructor(props) {
    super(props);
    const { AllClasses } = props;
    this.state = {
      page: 1,
      total: Math.ceil(AllClasses.length/10),
      selectedClasses: props.selectedClasses ? props.selectedClasses : [],
      searchedData: AllClasses,
    };
  }

  handleRowSelect = (rows) => {
    const { AllClasses, changeTakenClasses } = this.props;
    let { page, total, selectedClasses, searchedData } = this.state;
    let selected = [];
    let deselected = [];
    const startIndex = ((page - 1) * 10);
    const endIndex = startIndex + 9;
    // Creating arrays for selected and deselected classes of each page
    rows.forEach((val) => {
      selected.push(searchedData[val + startIndex].id);
    });
    for (let i = startIndex; i < endIndex; i++) {
      if (selected.indexOf(searchedData[i].id) === -1) {
        deselected.push(searchedData[i].id);
      }
    }
    // Will change selectedClasses state value depending on selected and deselected
    const selectedClassesIDs = selectedClasses.map((val) => (val.id));
    for (let i = 0; i < selected.length; i++) {
      if (selectedClassesIDs.indexOf(selected[i]) === -1) {
        const selectedClass = searchedData.find((val) => (val.id === selected[i]));
        selectedClasses.push(selectedClass);
        this.setState({ selectedClasses });
        changeTakenClasses(selectedClasses);
      }
    }
    for (let i = 0; i < deselected.length; i++) {
      const index = selectedClassesIDs.indexOf(deselected[i]);
      if (index !== -1) {
        selectedClasses.splice(index, 1);
        this.setState({ selectedClasses });
        changeTakenClasses(selectedClasses);
      }
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
          <TableHeader
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Class Code</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows
            showRowHover
            deselectOnClickaway={false}
          >
            { this.getRows() }
          </TableBody>
        </Table>
      </div>
    );
  }

  renderSearchBar = () => {
    return (
      <div className='search'>
        <div className='search-text'>
          <TextField
            floatingLabelText="Search"
            floatingLabelFixed
            hintText="Search by Class Name"
            fullWidth={true}
            onChange={this.search}
          />
        </div>
        <div className='search-icon'>
          <IconButton
            iconClassName="material-icons"
          >
            search
          </IconButton>
        </div>
        <br />
        <br />
      </div>
    );
  }

  search = (event, searchString) => {
    const { AllClasses } = this.props;
    searchString = searchString.trim().toLowerCase();
    const searchedData = [];
    for (let i = 0; i < AllClasses.length; i++) {
      const Class = AllClasses[i]; // variable is capitalized because 'class' is already used by JS
      const name = Class.name.toLowerCase();
      if (name.indexOf(searchString) !== -1) {
        searchedData.push(Class);
      }
    }
    this.setState({
      searchedData,
      total: Math.ceil(searchedData.length/10),
      page: 1,
    });
  }

  getRows = () => {
    const { AllClasses } = this.props;
    const { page, selectedClasses, searchedData } = this.state;
    const selectedClassesIDs = selectedClasses.map((val) => (val.id));
    const startIndex = ( page - 1) * 10;
    const endIndex = startIndex + 9;
    return searchedData.slice(startIndex, endIndex).map((value, index) => {
      return (
        <TableRow
          key={index}
          selected={selectedClassesIDs.indexOf(searchedData[index + startIndex].id) !== -1}
        >
          <TableRowColumn>{value.name}</TableRowColumn>
          <TableRowColumn>{value.class_code}</TableRowColumn>
        </TableRow>
      );
    })
  }

  renderUpdateButton = () => {
    return (
      <RaisedButton
        label="Update"
        backgroundColor="#1bb313"
        labelColor="#ffffff"
        onClick={this.handleUpdate}
      />
    );
  }

  handleUpdate = () => {
    const { updateMyClasses, user } = this.props;
    const classesIDs = user.takenClasses.map((val) => (val.id));
    updateMyClasses(user.netID, classesIDs);
  }

  render () {
    const { AllClasses, update } = this.props;
    return (
      <div>
        { this.renderSearchBar() }
        { this.renderTable() }
        <div style={{ padding: '12px' }} >
          <Pagination
            total={this.state.total}
            display={10}
            current={this.state.page}
            onChange={this.handlePaginationChange.bind(this)}
          />
        </div>
        { update && this.renderUpdateButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    user: state.user,
    AllClasses: state.data.AllClasses,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllClasses: getAllClasses,
      changeTakenClasses: changeTakenClasses,
      updateMyClasses: updateMyClasses,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassTable);
