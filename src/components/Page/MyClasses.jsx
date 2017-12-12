import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { myClasses } from './../../actions/user';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MyClasses extends Component {

  componentWillMount() {
    const { majors, major, user, myClasses } = this.props;
    if (user.netID) {
      myClasses(user.netID);
    } else {
      console.log('here');
      myClasses('ami10');
    }
  }

  mapClasses = () => {
    const { majors, major, data, user, overlappedClasses } = this.props;
    const id = majors.indexOf(major);
    if (user.takenClasses) {
      return user.takenClasses.map((value, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>{value.name}</TableRowColumn>
            <TableRowColumn>{value.class_code}</TableRowColumn>
          </TableRow>
        )
      })
    } else {
      return null;
    }
  }

  render() {
    const { sidebar } = this.props;
    if (!sidebar.submitted) {
      return null;
    }

    return (
      <div
        style={{
          margin: '15px'
        }}
      >
        <Table
          height='308px'
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Class Name</TableHeaderColumn>
              <TableHeaderColumn>Class Code</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
             displayRowCheckbox={false}
             stripedRows={true}
          >
            {this.mapClasses()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
    classes: state.classes,
    data: state.data,
    user: state.user,
    majors: state.data.majors,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      myClasses: myClasses,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);
