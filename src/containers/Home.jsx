import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardMedia, CardHeader} from 'material-ui/Card';

import Welcome from './../components/Page/Welcome';
import MyClasses from './../components/Page/MyClasses';
import Overlap from './../components/Page/Overlap';
import {Tabs, Tab} from 'material-ui/Tabs';

import MajorTable from './../components/Tables/MajorTable';
import ClassTable from './../components/Tables/ClassTable';
import ReqsTable from './../components/Tables/ReqsTable';

import { getAllMajors, getClasses, getReqs, getAllClasses } from './../actions/data';

let showWelcome = true;

const cardStyles = {
  margin: '10px',
  padding: '10px',
};

class Home extends Component {

  componentWillMount() {
    this.props.getAllMajors();
    this.props.getAllClasses();
  }

  componentWillReceiveProps(newProps) {
    const { history, user } = newProps;
    if (!user.isLoggedIn) {
      history.push('/login');
    }
  }

  render(){
    const { sidebar, user, data, majors } = this.props

    if (sidebar.submitted) {
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
                  <ReqsTable
                    majorID={majors.indexOf(sidebar.major1)}
                    reqs={data.requirements}
                  />
                </Tab>
                { sidebar.major2 === '' || showWelcome || !sidebar.submitted ? null :
                <Tab label={sidebar.major2}>
                  <MajorTable
                    major={sidebar.major2}
                  />
                  <ReqsTable
                    majorID={majors.indexOf(sidebar.major2)}
                    reqs={data.requirements}
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
                  <Card
                    style={cardStyles}
                  >
                    <CardHeader
                          title="Classes"
                          actAsExpander={true}
                          showExpandableButton={true}
                    />
                    <CardMedia
                      expandable={true}
                    >
                      <MyClasses />
                    </CardMedia>
                  </Card>
                  <Card
                    style={cardStyles}
                  >
                    <CardHeader
                          title="Edit Classes"
                          actAsExpander={true}
                          showExpandableButton={true}
                    />
                    <CardMedia
                      expandable={true}
                    >
                      <div className="edit-classes">
                        <ClassTable
                          selectedClasses={user.takenClasses}
                          update
                        />
                      </div>
                    </CardMedia>
                  </Card>
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
      getReqs: getReqs,
      getAllClasses: getAllClasses,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
