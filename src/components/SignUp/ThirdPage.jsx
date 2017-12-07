import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class ThirdPage extends Component {
  render () {
    return (
      <div className='third-step'>
        <h2>Congratulations! You are offically signed up for Duke Major Mapper</h2>
        <h3>Click the button below to continue to the home page.</h3>
        <Link to='/home'>
          <RaisedButton label='Home Page'/>
        </Link>
      </div>
    );
  }
}

export default ThirdPage;
