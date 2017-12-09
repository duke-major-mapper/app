import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';

import { getAllClasses } from './../../actions/data';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        stepIndex: 0,
      };
    }

    componentWillMount() {
      this.props.getAllClasses();
    }

    createStepper = () => {
      const { stepIndex } = this.state;
      return (
        <div className='stepper'>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Personal Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Choose Classes (Optional)</StepLabel>
            </Step>
            <Step>
              <StepLabel>Welcome to DMM!</StepLabel>
            </Step>
          </Stepper>
        </div>
      );
    }

    renderContent = () => {
      const { stepIndex } = this.state;
      switch (stepIndex) {
        case 0: {
          return <FirstPage />;
        }
        case 1: {
          return <SecondPage />;
        }
        case 2: {
          return <ThirdPage />;
        }
      }
    }

    handleNextStep = () => {
      const { stepIndex } = this.state;
      if (stepIndex == 2) {
        const { history } = this.props;
        history.push('/home');
      }
      this.setState({
        stepIndex: stepIndex + 1,
      })
    }

    handlePrevStep = () => {
      const { stepIndex } = this.state;
      this.setState({
        stepIndex: stepIndex - 1,
      })
    }

    render() {
      const { stepIndex } = this.state;
      const { name, netID, password } = this.props.signup;
      return (
        <div className='signup'>
          <Card>
            <CardText>
              {this.renderContent()}
              {this.createStepper()}
            </CardText>
            <CardActions>
              <FlatButton
                label='Back'
                disabled={ stepIndex === 0 }
                onClick={ this.handlePrevStep }
              />
              <RaisedButton
                label={ stepIndex === 2 ? 'Home Page' : 'Next' }
                disabled={ name === '' || netID === '' || password.length < 4}
                onClick={ this.handleNextStep }
                primary={true}
              />
            </CardActions>
          </Card>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    AllClasses: state.data.AllClasses,
    signup: state.signup,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllClasses: getAllClasses,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
