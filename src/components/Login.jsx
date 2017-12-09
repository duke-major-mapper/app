import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import SignUp from './SignUp';

import { triggerSignUp } from '../actions/signup';

import logo from './../images/DMM_logo.png';

class Login extends Component {
    render() {
      const { signup, triggerSignUp } = this.props;
      return (
        <div className="signup">
          {!signup.signup ?
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
                <br />
                <br />
                New to Duke Major Mapper?
                <FlatButton
                  label="Sign Up!"
                  secondary={true}
                  onClick={triggerSignUp}
                />
              </div>
            </Card>
            :
            <SignUp history={this.props.history} />
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
      triggerSignUp: triggerSignUp,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
