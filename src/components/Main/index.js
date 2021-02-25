import React from 'react';
import Home from '../pages/Home';
import MyArt from '../pages/MyArt';
import Token from '../pages/Token';
import AssetPage from '../pages/AssetPage';
import Collection from '../pages/Collections';
import Contact from '../pages/Contact';
import Creations from '../pages/Creations';
import { Switch, Route } from 'react-router-dom';


export default class Main extends React.Component {

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/MyArt' component={MyArt}></Route>
          <Route exact path='/Collection' component={Collection}></Route>
          <Route exact path='/Creations' component={Creations}></Route>
          <Route exact path='/Contact' component={Contact}></Route>
          <Route exact path='/asset/:tokenAddress/:tokenId' component={AssetPage}></Route>
        </Switch>
      </div>
    )
  }
}