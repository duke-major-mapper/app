import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';

import { changeName, changeNetID, changePassword, changeError } from './../../actions/signup';

class FirstPage extends Component {
  constructor(props) {
    super(props);
  }

  handleTextFieldChange = (event, newValue) => {
    const id = event.currentTarget.id;
    const { changeName, changeNetID, changePassword, changeError } = this.props;
    switch(id) {
      case 'name': {
        changeName(newValue.trim());
        changeError('');
        break;
      }
      case 'netID': {
        changeNetID(newValue.trim());
        changeError('');
        break;
      }
      case 'pass': {
        changePassword(newValue.trim());
        if (newValue.length < 4) {
          changeError('Password must be at least 4 characters long.');
        } else {
          changeError('');
        }
        break;
      }
    }  
    if (newValue.trim() === '') {
      changeError('Please make sure all fields are filled')
    }
  }

  render() {
    const { errorMessage } = this.props.signup;
    return (
      <div className='first-step'>
        <h4> Personal Information: </h4>
        <TextField
          id="name"
          floatingLabelText="Name"
          floatingLabelFixed={true}
          onChange={this.handleTextFieldChange}
        />
        <br />
        <br />
        <TextField
          id="netID"
          floatingLabelText="netID"
          floatingLabelFixed={true}
          onChange={this.handleTextFieldChange}
        />
        <br />
        <br />
        <TextField
          id="pass"
          floatingLabelText="New Password"
          floatingLabelFixed={true}
          type="password"
          onChange={this.handleTextFieldChange}
        />
        <br />
        <br />
        {errorMessage.length === 0 ? null :
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    signup: state.signup,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changeName: changeName,
      changeNetID: changeNetID,
      changePassword: changePassword,
      changeError: changeError,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
