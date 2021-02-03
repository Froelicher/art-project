import React from 'react';
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';
import './index.css';
import Background from './img/Cryptoart.png';
import Mrcrypthodl from './img/Cryptoart Bitcoin.png';


export default class MyArt extends React.Component {

  render() {
    const backgroundPage={
      backgroundImage : `url(${Background})`
    }
    return (
      <main>
        <Section style={backgroundPage}>
          <div class="container">
            <div class="about-section">
              <div class="floating">
                <img src={Mrcrypthodl} class="logo"></img>
              </div>
              <div  class="one-col">
                <h2>Anything to say?</h2>
                <h1>HODL@MrCryptHODL.com</h1>
            
                  <p>MrCryptHODL<br></br>
                  ETH SIGNED MESSAGE :<a href="https://etherscan.io/verifySig/2359" target="_blank">https://etherscan.io/verifySig/2359</a></p>
              </div>
            </div>
          </div>
        </Section>
       
      </main>
    )
  }
}
const Section = styled.section`

background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
height: 100%;
width: 100%;
.about-section{
    padding-top : 30px;
    color : #FFF;
  }
  .logo{
    max-width : 550px;
    margin : auto;
    display : block;
  }
  .one-col{
    text-align : justify;
    padding-top : 15px;
    padding-bottom : 10px;
    margin-left : -50px;
    margin-right : -50px;
  }
  .two-col p{
    padding-right : 20px;
  }
  .two-col:last-child p{
    padding-right : 0px;
  }
  .how-section{
    padding-top : 60px;
  }
`
