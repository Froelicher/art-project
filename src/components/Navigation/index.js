import React from 'react'
import styled from 'styled-components';
import { NavLink }  from 'react-router-dom';
import { OrderSide } from 'opensea-js/lib/types';
import logo from './img/red-circle.png';


export default class Navigation extends React.Component {

  state  = {change : false}

  clickResponsiveMenu = () => {
    this.setState({
      change: !this.state.change
    })
  }

  render(){
    const menuVis = this.state.change ? 'change' : '';
    return(
      <div class={`menu ${menuVis}`}>
      <nav class={`main-menu ${menuVis}`}>
        <div class="under-logo">
          <p>宇衣安</p>
        </div>
        <ul>
          <li onClick={this.clickResponsiveMenu}><NavLink to="/"><img src={logo}></img></NavLink></li>
          <li onClick={this.clickResponsiveMenu}><NavLink to="/">Home</NavLink></li> 
          <li onClick={this.clickResponsiveMenu}><NavLink to="/MyArt">About</NavLink></li>
          <li onClick={this.clickResponsiveMenu}><NavLink to="/Collection">My collection</NavLink></li>
          <li onClick={this.clickResponsiveMenu}><NavLink to="/Creations">My creations</NavLink></li>
          <li onClick={this.clickResponsiveMenu}><NavLink to="/Contact">Contact</NavLink></li>
        </ul>
      </nav>
      <div class={`responsive-menu ${menuVis}`} onClick={this.clickResponsiveMenu}>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <script>
      
      </script>
      </div>

      
    )
  }
}
