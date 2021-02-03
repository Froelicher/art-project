import React from 'react';
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';
import './index.css';
import Background from './img/Cryptoart.png';
import CryptArt from './img/CryptArt-Logo.png';
import CryptHODL from './img/CryptHODL-logo.png';

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
                <img src={CryptArt} class="logo"></img>
              </div>
              <div  class="one-col">
                <h2>ERC-1155 CryptArt(CART) Token</h2>

                <p><a href="https://etherscan.io/token/0xc233baa25ae0caDB5928550ba437acb2AF637F77" target="_blank">CryptArt(CART)</a> is an ERC-1155 token created on <a href="https://etherscan.io/tx/0x8762b3acfd1bfb23f2d16427a9f68e19b766168cb13636e2f944b2f51e337300" target="_blank">Jan-30-2021[txn]</a> that is hosted on Ethereum's own blockchain.<br></br></p>
                <p>this is the Token of the CryptArt NFT Project, These are artistic GIFs that summarize news from the world of cryptocurrency, each series of CryptART NFT will be produced in 12 copies or less.</p>
                <p>Smart Contract Adress :<br></br> <a href="https://etherscan.io/address/0xc233baa25ae0caDB5928550ba437acb2AF637F77" target="_blank">CryptArt(CART) Contract</a><br></br></p>
                <p>Etherscan Token Tracker :<br></br> <a href="https://etherscan.io/token/0xc233baa25ae0caDB5928550ba437acb2AF637F77" target="_blank">CryptArt(CART) Token</a><br></br></p>
                <p>Rarible Collection :<br></br> <a href="https://app.rarible.com/cryptart" target="_blank">https://app.rarible.com/cryptart</a><br></br></p>
                <p>OpenSea Collection :<br></br> <a href="https://opensea.io/collection/cryptart" target="_blank">https://opensea.io/collection/cryptart</a><br></br></p>
              </div>
              <p>ETH SIGNED MESSAGE :<a href="https://etherscan.io/verifySig/2359" target="_blank">https://etherscan.io/verifySig/2359</a></p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="container">
            <div class="about-section">
        <div class="floating">
          <img src={CryptHODL} class="logo"></img>
            </div>
              <div  class="one-col">
                <h2>ERC-721 CryptHODL(CHODL) Token</h2>

                <p><a href="https://etherscan.io/token/0x91b16D509aa3377A526cD0794b8FF7DcFc84Fcdf" target="_blank">CryptHODL(CHODL)</a> is an ERC-721 token created <a href="https://etherscan.io/tx/0x86426358646eed03605f2747ea715eaa6de96851ade9d002fe924f448c744db0" target="_blank">Jan-20-2021[txn]</a> that is hosted on Ethereum's own blockchain.<br></br></p>
                <p>this is the Token of the CryptHODL Project, The token is used to list physical art pieces on the blockchain.</p>
                <p>Each collection of Cryptoart CryptHODL is delivered with its NFT version to proof the ownership of the crypto art</p>
                <p>Smart Contract Adress :<br></br> <a href="https://etherscan.io/address/0x91b16D509aa3377A526cD0794b8FF7DcFc84Fcdf" target="_blank">CryptHODL(CHODL) Contract</a><br></br></p>
                <p>Etherscan Token Tracker :<br></br> <a href="https://etherscan.io/token/0x91b16D509aa3377A526cD0794b8FF7DcFc84Fcdf" target="_blank">CryptHODL(CHODL) Token</a><br></br></p>
                <p>Rarible Collection :<br></br> <a href="https://app.rarible.com/crypthodl/collectibles" target="_blank">https://app.rarible.com/crypthodl</a><br></br></p>
                <p>OpenSea Collection :<br></br> <a href="https://opensea.io/collection/crypthodl" target="_blank">https://opensea.io/collection/crypthodl</a><br></br></p>
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
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    width: 100%;
    display : inline-block;

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

