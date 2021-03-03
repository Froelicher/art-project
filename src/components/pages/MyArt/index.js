import React from 'react';
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';
import './index.css';
import Background from '../Home/img/texture.png';
import Mrcrypthodl from './img/Cryptoart Bitcoin.png';


export default class MyArt extends React.Component {

  render() {
    const backgroundPage={
      backgroundImage : `url(${Background})`,
      backgroundColor : 'rgb(225, 107, 140)'
    }
    return (
      <main>
        <Section style={backgroundPage}>
          <div class="container">
            <div class="about-section">
              <div class="title-page">
                <h1>宇衣安</h1>
              </div>
              <div  class="one-col">
                <h2>Izumi - NFT Gallery</h2>
                 
                <p><a href="https://app.rarible.com/crypthodl/collectibles" target="_blank">Izumi - NFT Gallery</a> is a NFT Creator and Collector based in Switzerland.<br></br></p>
                <p>Izumi's NFTs are both inspired by Japan and technology, they are full of color and have their own unique identity.<br></br></p>
                <p>In addition to creating and collecting, Izumi - NFT Gallery has a blog dedicated to criticism of the NFTs that we have acquired, various subjects are covered on each NFT found in the blog, and a 2-minute video will accompany you.<br></br></p> 
                <p>Various events are organized on our site, including the sale of our creations as well as the auctions on our collection.
                </p> 
                <p><a href="https://app.rarible.com/cryptart/onsale" target="_blank">Izumi NFT Gallery</a> NFTs are digital arts limited to 10pcs per NFT !</p>
                <p>In most cases they are "Unlockable" which means that with the purchase of NFT You will receive a link with the high definition printable version.</p>
                <p>Each NFT Izumi - NFT Gallery is limited to 10 editions based on the ERC 1155 <a href="http://localhost:3000/Token" target="_blank">Izumi(INFT)</a> Token an ERC-1155 tokens that is hosted on Ethereum's own blockchain.<br></br></p>
                  
                <p>2021 will be the year of the great NFT.</p>

                  <p>IZUMI<br></br>
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

background-repeat: repeat;
padding-bottom : 50px;

height: 100%;
width: 100%;

.title-page h1{
  display : block;
  font-size : 72px;
  padding : 50px 0px;
}

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
  }
  .two-col p{
    padding-right : 20px;
  }
  .two-col:last-child p{
    padding-right : 0px;
  }
`
