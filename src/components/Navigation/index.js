import React from 'react'
import styled from 'styled-components';
import { NavLink }  from 'react-router-dom';
import { OrderSide } from 'opensea-js/lib/types';
import logo from './img/red-circle.png';


export default class Navigation extends React.Component {

  render(){
    return(
      <nav class="main-menu">
        <div class="under-logo">
          <p>宇衣安</p>
        </div>
        <ul>
          <li><NavLink to="/"><img src={logo}></img></NavLink></li>
          <li><NavLink to="/">Home</NavLink></li> 
          <li><NavLink to="/MyArt">About</NavLink></li>
          <li><NavLink to="/Collection">My collection</NavLink></li>
          <li><NavLink to="/Creations">My creations</NavLink></li>
          <li><NavLink to="/Contact">Contact</NavLink></li>
        </ul>
      </nav>
    )
  }
}
