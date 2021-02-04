import React from 'react';
import styled from 'styled-components';
import Parallax from 'react-springy-parallax'
import Log from '../../Log';
import Header from '../../Header';
import CryptHODL from '../Token/img/Short-Squeeze-2.gif';
import Background from './img/Cryptoart.png';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';
import CryptArt from './img/Crypthodl-cryptoart.png';
import CryptArt2 from './img/Crypthodl2-cryptoart.png';
export default class Home extends React.Component {

  state = {
    accountAddress: null
  }

  constructor(props) {
    super(props)
    this.onChangeAddress()
    onNetworkUpdate(this.onChangeAddress)
  }

  onChangeAddress = () => {
    this.seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Main
    })
    this.web3 = this.seaport.web3
    this.web3.eth.getAccounts((err, res) => {
      this.setState({
        accountAddress: res[0]
      })
    })
  }

  render() {
    const styles = {

      fontSize: 18,
      lineHeight: '22px',
      color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
    
    const header = {
      fontFamily: 'Menlo-Regular, Menlo, monospace',
      lineHeight: '10px',
      color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 44
    }

    const buttonBottom = {
      fontSize: 10,
      position : 'absolute',
      bottom : 20,
      margin : 'auto',
      cursor : 'pointer'
    }

    const title_page = {
      fontSize: 38
    }

    const title_page_center = {
      fontSize: 42,
      textAlign: "center",
      marginBottom: "50px"
    }

    const one_page = {
      width : '100%',
      display : 'inline-block'
    }


    return (
        <Parallax ref="parallax" pages={4}>

          <Parallax.Layer factor={1} offset={0} speed={0} style={{ backgroundImage : `url(${Background})` }} />
          <Parallax.Layer factor={1} offset={1} speed={0} style={{ backgroundImage : `url(${Background})` }} />
          <Parallax.Layer factor={1} offset={2} speed={0} style={{ backgroundImage : `url(${Background})` }} />
          <Parallax.Layer factor={1} offset={3} speed={0} style={{ backgroundImage : `url(${Background})` }} />

          <Parallax.Layer
                factor={1}
                offset={0}
                speed={0.1}
                style={header}
                onClick={() => this.refs.parallax.scrollTo(1)}
                onScroll={() => this.refs.parallax.scrollTo(1)}>
                <Section>
                <div class="floating">
                <img src={CryptArt} class="logo"></img>
              </div>
                  <div class="one-col">
                    <h1>MrCryptHODL - Cryptoart 'n' NFT</h1>
                  </div>
                  <div class="one-col">
                    <h4 class="sub-title-home">Physical and Digital cryptoarts with proof of ownership stored on the Ethereum blockchain.</h4>
                  </div>
                </Section>
                <div style={buttonBottom}>
                  <p>Go to bottom</p>
                </div>
            </Parallax.Layer>
          <main>
          <Parallax.Layer
                factor={1}
                offset={1}
                speed={0.2}
                style={styles}
                class="layerParallax"
                onClick={(e) =>  { if(e.target.classList.contains('layerParallax')) {this.refs.parallax.scrollTo(2); console.log(e.target.classList)} }}>
            <Section>
            <div class="container">
              <div class="whatis-section">
                <div  class="two-col">
                  <img src={CryptHODL} class="img-whatis"></img>
                </div>
                <div class="two-col">
                  <h3>CryptArt NFTs are digital arts inspired by current events in the world of Cryptocurrency</h3>
                  <p>The "CryptArt" are the NFT cryptoart of MrCryptHODL, they are inspired by current events in the cryptocurrency world, they are limited editions produced at 12 pieces by "CryptArt", they are based on the ERC-1155 <a href="http://localhost:3000/Token" target="_blank">CryptArt(CART)</a> Token and available on Rarible
                  </p>
                  <p>All auctions start on Rarible, you can also bid on OpenSea</p>
                <p>Rarible Collection :<br></br> <a href="https://app.rarible.com/cryptart" target="_blank">https://app.rarible.com/cryptart</a><br></br></p>
                <p>OpenSea Collection :<br></br> <a href="https://opensea.io/collection/cryptart" target="_blank">https://opensea.io/collection/cryptart</a><br></br></p>
                </div>
              </div>
            </div>
            </Section>
            <div style={buttonBottom}>
                  <p class="layerParallax">Go to bottom</p>
            </div>
            </Parallax.Layer>

            <Parallax.Layer
                factor={1}
                offset={2}
                speed={0.3}
                style={styles}
                class="layerParallax"
                onClick={(e) =>  { if(e.target.classList.contains('layerParallax')) {this.refs.parallax.scrollTo(2); console.log(e.target.classList)} }}>
            <Section>
            <div class="container">
              <div class="whatis-section">
                <div  class="two-col">
                  <img src={CryptArt2} class="img-whatis"></img>
                </div>
                <div class="two-col">
                  <h3>CryptHODL Cryptoarts are Bitcoin collectibles produced in limited edition most often of only 50 pieces.</h3>
                  <p>The "CryptHODL" are physical cryptoarts produced at 50 coins per collection delivered with their certificates of authenticity and NFT version based on the Token ERC721 <a href="http://localhost:3000/Token" target="_blank">CryptHODL (CHODL)</a>, they are available on Bitcointalk Forum when they are released.
                  </p>
                  <p>All auctions start on Bitcointalk</p>
                <p>Bitcointalk Thread :<br></br> <a href="hhttps://bitcointalk.org/index.php?topic=5310488.0" target="_blank">https://bitcointalk.org/index.php?topic=5310488.0</a><br></br></p>
                </div>
              </div>
            </div>
            </Section>
            <div style={buttonBottom}>
                  <p class="layerParallax">Go to bottom</p>
            </div>
            </Parallax.Layer>

            <Parallax.Layer
                factor={1}
                offset={3}
                speed={0.4}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(3)}>
                <Section>
                  <div class="container">
                    <div class="one-col" style={one_page}>
                      <h2 style={title_page_center}>My lasts creations</h2>
                    </div>
                    <div class="one-col" style={one_page}>
                      <Log
                      seaport={this.seaport}
                      accountAddress={this.state.accountAddress} />
                    </div>
                  </div>
                </Section>
                <div style={buttonBottom}>
                  <p class="layerParallax">Go to bottom</p>
                </div>
            </Parallax.Layer>
          </main>
        </Parallax>
    )
  }
}

const ImgRibbon = styled.img`
  width: 150px;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;

  @media(max-width: 600px) {
    width: 80px;
  }
`

const Section = styled.section`

  .img-whatis{
    width : 80%;
    margin : auto;
    display : block;
  }

  .whatis-section{
    padding-top : 30px;
  }

  .sub-title-home{
    text-align : center;
    margin-top : 20px;
  }
  
  .two-col{
    width : 50%;
    display : inline-block;
    padding : 20px 0px;
    height : 100%;
    vertical-align : top;
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
  .three-col{
    width : 33%;
    display : inline-block;
    padding : 20px 0px;
    height : 100%;
    vertical-align : top;
  }
  .three-col p{
    padding-right : 20px;
  }
  .three-col:last-child p{
    padding-right : 0px;
  }
  .three-col h4{
    vertical-align : top;
    font-size : 10pt;
    color : #000;
    font-weight : 700;
  }
  .logo{
    max-width : 100%;
  }
`