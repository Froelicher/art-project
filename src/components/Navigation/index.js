import React from 'react'
import styled from 'styled-components';
import { NavLink }  from 'react-router-dom';
import { OrderSide } from 'opensea-js/lib/types';



export default class Navigation extends React.Component {

  render(){
    return(
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li> 
          <li><NavLink to="/MyArt">About</NavLink></li>
          <li><NavLink to="/Token">Token</NavLink></li>
          <li><NavLink to="/Collectibles">Collectibles</NavLink></li>
          <li><NavLink to="/Contact">Contact</NavLink></li>
        </ul>
      </nav>
    )
  }
}
