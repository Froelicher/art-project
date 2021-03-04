import React from 'react';
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';
import './index.css';
import Background from './img/Cryptart.png';
import CryptArt from './img/CryptArt-Logo.png';
import CryptHODL from './img/CryptHODL-logo.png';
import CryptH from './img/Logo-Twitter.png';

export default class Token extends React.Component {

  render() {
    const backgroundPage={
      backgroundImage : `url(${Background})`
      
    }
    return (
    <main style={backgroundPage}>
      <Section>
        <div class="column">
          <div class="container">
            <div class="about-section">
              <div class="floating">
              <a href="https://opensea.io/"><img src={CryptArt} class="logo"></img></a>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="container">
            <div class="about-section">
              <div class="floating">
              <a href="https://twitter.com/"><img src={CryptH} class="logo"></img></a>
              </div>
            </div>
          </div>
        </div>
        <div class="column2">
          <div class="container">
            <div class="about-section">
        <div class="floating">
        <a href="https://app.rarible.com/"><img src={CryptHODL} class="logo"></img></a>
            </div>
            </div>
            
          </div>
        </div>
      </Section>
    </main>
    )
  }
}
const Section = styled.section`
background-repeat: repeat;
padding-bottom : 50px;

height: 100vh;
width: 100%;

.column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    }
.about-section{
    color : #FFF;
    padding : 20px 40px;
  }
  .logo{
    max-width : 100%;
    margin : auto;
    display : block;
  }

`

