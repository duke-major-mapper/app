import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import FirstPage from './FirstPage';
import ThirdPage from './ThirdPage';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        stepIndex: 0,
      };
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
              <StepLabel>Choose Classes</StepLabel>
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
          return ( <FirstPage /> );
        }
        case 1: {
          return null;
        }
        case 2: {
          return <ThirdPage />
        }
      }
    }

    handleNextStep = () => {
      const { stepIndex } = this.state;
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
                label={ stepIndex === 3 ? 'Finish' : 'Next' }
                onClick={ this.handleNextStep }
                primary={true}
              />
            </CardActions>
          </Card>
        </div>
      );
    }
}

export default SignUp;
