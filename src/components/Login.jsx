import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import logo from './../images/DMM_logo.png';

export default class Login extends Component {
    render() {
      return (
        <div className="signup">
          <Card>
            <div style={{ padding: '24px' }}>
              <img style={{ display: 'inline-block' }} src={logo} alt="logo" height="90"/> <br/>
              <TextField
                hintText=""
                floatingLabelText="Username"
              /><br />
              <TextField
                hintText=""
                floatingLabelText="Password"
                type="password"
              /><br /> <br />
              <RaisedButton
                label="Sign in"
                primary={true}
                // onClick={this.handleClick.bind(this)}
              />
            </div>
          </Card>
        </div>
      );
    }
}
