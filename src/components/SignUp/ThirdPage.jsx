import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import DMM_letters from './../../images/DMM_letters.png';

class ThirdPage extends Component {
  render () {
    return (
      <div className='third-step'>
        <h2>Congratulations! You are offically signed up for Duke Major Mapper</h2>
        <h3>Click the Home Page button below to continue to the home page.</h3>
        <img src={DMM_letters} alt="DMM_letters" height='200em'/>
      </div>
    );
  }
}

export default ThirdPage;
