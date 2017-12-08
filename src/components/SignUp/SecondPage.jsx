import React, { Component } from 'react';
import ClassTable from './ClassTable';

class SecondPage extends Component {
  render() {
    return (
      <div>
        <h3>Select the classes you have taken below: </h3>
        <br />
        <br />
        <ClassTable />
      </div>
    );
  }
}

export default SecondPage;
