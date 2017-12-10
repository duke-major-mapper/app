import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

import SignUp from './SignUp';

import { triggerSignUp } from '../actions/signup';
import { login } from '../actions/user';

import logo from './../images/DMM_logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idValue: '',
      passValue: '',
      errorMessage: '',
    }
  }
  handleTextFieldChange = (event, newValue) => {
    const id = event.currentTarget.id;
    newValue = newValue.trim();
    switch(id) {
      case 'id': {
        this.setState({ idValue: newValue });
        break;
      }
      case 'password': {
        this.setState({ passValue: newValue });
        break;
      }
    }
  }

  handleSignIn = () => {
    const { idValue, passValue } = this.state;
    const { login, user } = this.props;
    login(idValue, passValue);
  }

  render() {
    const { signup, triggerSignUp, login, user, history } = this.props;
    return (
      <div className="signup">
        { user.success ?  history.push('/home') : null}
        {!signup.signup ?
          <Card>
            <div style={{ padding: '24px' }}>
              <img style={{ display: 'inline-block' }} src={logo} alt="logo" height="90"/> <br/>
              <TextField
                id="id"
                hintText=""
                floatingLabelText="netID"
                onChange={this.handleTextFieldChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    this.handleSignIn();
                  }
                }}
              /><br />
              <TextField
                id="password"
                hintText=""
                floatingLabelText="Password"
                type="password"
                onChange={this.handleTextFieldChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    this.handleSignIn();
                  }
                }}
              /><br /> <br />
              <RaisedButton
                label="Sign in"
                primary={true}
                onClick={this.handleSignIn}
              />
              {!user.isLoading ? null :
                <div>
                  <br />
                  <CircularProgress
                    style={{ display: 'table', margin: '0 auto'}}
                    size={80}
                    thickness={6}
                  />
                </div>
              }
              {!user.error ? <br /> :
                <p style={{ color: 'red' }}>Incorrect login information</p>
              }
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
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      triggerSignUp: triggerSignUp,
      login: login,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
