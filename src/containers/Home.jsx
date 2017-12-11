import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardMedia, CardHeader} from 'material-ui/Card';

import Welcome from './../components/Page/Welcome';
import MajorTable from './../components/Page/MajorTable';
import MyClasses from './../components/Page/MyClasses';
import Overlap from './../components/Page/Overlap';
import {Tabs, Tab} from 'material-ui/Tabs';

import { getAllMajors } from './../actions/data';
import { getClasses } from './../actions/data';

let showWelcome = true;

const cardStyles = {
  margin: '10px',
  padding: '10px',
};

class Home extends Component {

  componentWillMount() {
    this.props.getAllMajors();
  }

  render(){
    const { sidebar, user, data } = this.props

    if (sidebar.submitted){
      showWelcome = false
    }
    return(
      <div
        className={sidebar.docked ? "true-dock" : "false-dock"}
      >
            {showWelcome|| !sidebar.submitted ? <Welcome name={user.name} /> :
              <Tabs>
                <Tab label={sidebar.major1}>
                  <MajorTable
                    major={sidebar.major1}
                  />
                </Tab>
                { sidebar.major2 === '' || showWelcome || !sidebar.submitted ? null :
                <Tab label={sidebar.major2}>
                  <MajorTable
                    major={sidebar.major2}
                  />
                </Tab>
                }
                {
                  sidebar.major2 && sidebar.submitted ?
                  <Tab label="Overlap">
                    <Overlap />
                  </Tab>
                  : null
                }
                <Tab label="My Classes">
                  <MyClasses />
                </Tab>
              </Tabs>
            }

            {/* Loading Animation stays on the bottom */}
            { data.isLoading && !showWelcome ?
              <CircularProgress
                style={{ display: 'table', margin: '0 auto'}}
                size={80}
                thickness={6}
              />
              : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
    data: state.data,
    user: state.user,
    majors: state.data.majors,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getClasses: getClasses,
      getAllMajors: getAllMajors,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
