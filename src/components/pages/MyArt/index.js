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
                <h2>CryptoArt inspired by reality</h2>
                 
                <p><a href="https://app.rarible.com/crypthodl/collectibles" target="_blank">CryptHODL</a> Cryptoarts are Bitcoin collectibles produced in limited edition most often of only 50 pieces.<br></br></p>
                <p>They are delivered with their NFT version based on the <a href="http://localhost:3000/Token" target="_blank">CryptHODL(CHODL)</a> Token an ERC-721 tokens that is hosted on Ethereum's own blockchain. The main use of this Token is to register a Cryptoart on the BlockChain, Each Cryptoart "CryptHODL" has a certificate of authenticity linked to the NFT version and the 'BTC public address of the Cryptoart.<br></br></p>
                <p> On each Cryptoart "CryptHODL" you will find a 3D Hologram tamper evident Sticker with a transparent window. On the visible part there is a QR Code with your public BTC address, to access the private key disimulated under the public key you will have to take off the Tamper Evident hologram sticker.<br></br></p> 
                <p>The private and public BTC keys are created on a secure computer, to guarantee a trust between artist and buyer, my identity is not private, it can be retrieved with a WHOIS
                </p> 
                <p><a href="https://app.rarible.com/cryptart/onsale" target="_blank">CryptArt</a> NFTs are digital arts inspired by current events in the world of Cryptocurrency</p>
                <p>In most cases they are "Unlockable" which means that with the purchase of "CryptArt" You will receive a link with the high definition printable version in A2 format</p>
                <p>Each NFT CryptArt is limited to 12 editions based on the ERC 1155 <a href="http://localhost:3000/Token" target="_blank">CryptArt(CART)</a> Token an ERC-1155 tokens that is hosted on Ethereum's own blockchain, this Token is used for MrCryptHODL's NFT Cryptoarts unlike the ERC721 CryptHODL(CHODL) token which is used to register physical Cryptoarts on the blockchain.<br></br></p>
                <p>being in the world of Bitcoin and Cryptocurrency since 2012, MrCryptHODL is a cryptocurrency enthusiast and a user above all who lives in Geneva in Switzerland, for years he has been fascinated by part of this world, cryptoarts, art is cryptocurrency are 2 things so identical, both are art.<br></br></p>
                  
                <p>2021 will be the year of the great Cryptoarts.</p>

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
    padding-top : 15px;
    color : #FFF;
  }
  .logo{
    max-width : 550px;
    margin : auto;
    display : block;
  }
  .one-col{
    text-align : justify;
    margin-left : -50px;
    margin-right : -50px;
  }
  .two-col p{
    padding-right : 20px;
  }
  .two-col:last-child p{
    padding-right : 0px;
  }
`
