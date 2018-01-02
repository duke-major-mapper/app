import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import {
  AppBar,
  Drawer,
} from 'material-ui';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import { dockTriggered } from "./../actions/sidebar-action";
import { getAllMajors } from './../actions/data';
import { logout } from './../actions/user';
import Sidebar from "./Sidebar";

import DMM_header from './../images/DMM_header.png';

class Header extends Component {
  onMenuClick = () => {
    this.props.dockTriggered();
  }

  signOut = () => {
    const { user, logout } = this.props;
    const { netID } = user;
    logout(netID);
  }

  render() {
    const logo = (
      <div>
        <img alt="logo" src={DMM_header} height="60em" width="280em"/>
      </div>
    );
    const { showMenu } = this.props.sidebar;
    return (
      <div>
        <AppBar
          title={logo}
          onLeftIconButtonTouchTap={this.onMenuClick.bind(this)}
          iconElementRight={!showMenu ? null :
            <IconMenu
              iconButtonElement={<IconButton iconClassName="material-icons">more_vert</IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem primaryText="Sign out" onClick={this.signOut}/>
            </IconMenu>
          }
          showMenuIconButton={showMenu}
        />
        <Drawer
          docked={this.props.sidebar.docked}
          containerStyle={{height: 'calc(100% - 64px)', top: 64}}
        >
          <Sidebar />
        </Drawer>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      dockTriggered: dockTriggered,
      getAllMajors: getAllMajors,
      logout: logout,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
