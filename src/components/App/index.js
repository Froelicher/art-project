import React from 'react';
import Main from '../Main';
import Navigation from '../Navigation';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Navigation />
        <Main />
      </div>
    )
  }
}