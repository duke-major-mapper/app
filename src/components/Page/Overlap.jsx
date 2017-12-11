import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {Card, CardMedia, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import MajorTable from './MajorTable';

import { getOverlap } from './../../actions/data';
import { overlapTriggered } from './../../actions/sidebar-action';

const labelStyle = {
  fontSize: '200%'
};

const buttonStyle = {
  height: '5em',
};

const style = {
  margin: '8px'
};

const cardStyles = {
  margin: '10px',
  padding: '10px',
};


class Overlap extends Component {
  componentWillMount() {
    const { sidebar, data, majors, getOverlap, overlapTriggered } = this.props;
    const major1 = sidebar.major1;
    const major2 = sidebar.major2;

    const id1 = majors.indexOf(major1);
    const id2 = majors.indexOf(major2);

    getOverlap(id1, id2);
    overlapTriggered();
  }

  render() {
    const { sidebar, data, majors } = this.props;
    const major1 = sidebar.major1;
    const major2 = sidebar.major2;

    return (
      <div>
          <MajorTable overlappedClasses={data.overlap} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
    data: state.data,
    majors: state.data.majors,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getOverlap: getOverlap,
      overlapTriggered: overlapTriggered,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlap);
