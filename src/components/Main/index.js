import React from 'react';
import Home from '../pages/Home';
import MyArt from '../pages/MyArt';
import Collectibles from '../pages/Collectibles';
import Contact from '../pages/Contact';
import { Switch, Route } from 'react-router-dom';


export default class Main extends React.Component {

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/MyArt' component={MyArt}></Route>
          <Route exact path='/Collectibles' component={Collectibles}></Route>
          <Route exact path='/Contact' component={Contact}></Route>
        </Switch>
      </div>
    )
  }
}