import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getClasses, getReqs } from './../../actions/data';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MajorTable extends Component {

  componentWillMount() {
    const { majors, major, user, sidebar, getReqs, getClasses } = this.props;
    const majorID = majors.indexOf(major);
    const takenClassesIDs = user.takenClasses.map((val) => (val.id));
    getClasses(majorID, takenClassesIDs);
    getReqs(majorID, takenClassesIDs);
  }

  mapClasses = () => {
    const { majors, major, data, overlappedClasses } = this.props;
    const id = majors.indexOf(major);
    if (overlappedClasses) {
      return overlappedClasses.map((value, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>{value.name}</TableRowColumn>
            <TableRowColumn>{value.class_code}</TableRowColumn>
          </TableRow>
        )
      })
    } else if (data.classes[id]) {
      return data.classes[id].map((value, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>{value.name}</TableRowColumn>
            <TableRowColumn>{value.class_code}</TableRowColumn>
            <TableRowColumn>{value.description}</TableRowColumn>
          </TableRow>
        )
      })
    } else {
      return null;
    }
  }

  render() {
    const { sidebar, overlappedClasses } = this.props;
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
              {overlappedClasses ? null :
                <TableHeaderColumn>Requirement Description</TableHeaderColumn>}
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
      getClasses: getClasses,
      getReqs: getReqs,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MajorTable);
