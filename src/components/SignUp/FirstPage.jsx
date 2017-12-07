import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class FirstPage extends Component {
  render() {
    return (
      <div className='first-step'>
        <h4> Personal Information: </h4>
        <TextField
          floatingLabelText="Name"
          floatingLabelFixed={true}
        />
        <br />
        <br />
        <TextField
          floatingLabelText="netID"
          floatingLabelFixed={true}
        />
        <br />
        <br />
        <TextField
          floatingLabelText="New Password"
          floatingLabelFixed={true}
          type="password"
        />
        <br />
        <br />
      </div>
    );
  }
}

export default FirstPage;
