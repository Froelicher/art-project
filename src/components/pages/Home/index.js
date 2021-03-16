import React from 'react';
import styled from 'styled-components';
import Parallax from 'react-springy-parallax'
import Log from '../../Log';
import Header from '../../Header';
import CryptHODL from '../Token/img/Short-Squeeze-2.gif';
import Background from './img/texture.png';
import BackgroundHeader from '../Home/img/5013252.jpg';
import BackgroundGloss from './img/gloss.png';
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
      marginBottom: "20px"
    }

    const one_page = {
      width : '100%',
      display : 'inline-block'
    }

    const gloss = {
      width : '100%',
      position : 'fixed',
      height : '478px',
      background : 'url('+BackgroundGloss+') repeat-x',
      zIndex : '11'
    }



    return (
      <React.Fragment>
        {/*<div class="gloss" style={gloss}></div>*/}
        <Parallax ref="parallax" pages={5}>
          <div class="home">
          <Parallax.Layer factor={1} offset={0} speed={0} style={{ backgroundImage : `url(${BackgroundHeader})`, backgroundColor : 'rgb(244, 167, 185)', backgroundRepeat : 'repeat', backgroundSize : 'cover', backgroundPosition : 'center bottom'}} />
          <Parallax.Layer factor={1} offset={1} speed={0} style={{ backgroundImage : `url(${Background})`, backgroundColor : 'rgb(225, 107, 140)', backgroundRepeat : 'repeat' }} />
          <Parallax.Layer factor={1} offset={2} speed={0} style={{ backgroundImage : `url(${Background})`, backgroundColor : '#F8C3CD', backgroundRepeat : 'repeat' }} />
          <Parallax.Layer factor={1} offset={3} speed={0} style={{ backgroundImage : `url(${Background})`, backgroundColor : '#EEA9A9', backgroundRepeat : 'repeat' }} />
          <Parallax.Layer factor={1} offset={4} speed={0} style={{ backgroundImage : `url(${Background})`, backgroundColor : '#DC9FB4', backgroundRepeat : 'repeat' }} />
    
          <Parallax.Layer
                factor={1}
                offset={0}
                speed={0.1}
                style={header}>
                
                <Section class="header-home-section">
                <div class="logo-header japanColorText">
                  <h1>宇衣安</h1>
                </div>
                  <div class="one-col japanColorText">
                    <h1>Izumi - NFT Gallery</h1>
                  </div>
                  {/*                  <div class="one-col japanColorText">
                    <h4 class="sub-title-home">Physical and Digital cryptoarts with proof of ownership stored on the Ethereum blockchain.</h4>
                  </div>*/}
                </Section>
            </Parallax.Layer>
          <main>
          <Parallax.Layer
                factor={1}
                offset={1}
                speed={0.2}
                style={styles}
                class="layerParallax">
            <Section class="content-section">
            <div class="container">
              <div class="whatis-section">
                <div  class="one-col">
                  <h1>What is an NFT ?</h1>
                  <p>A non-fungible token (NFT) is a type of cryptographic token which represents something unique. 
                    Or put another way, non-fungible tokens are not mutually interchangeable by their individual specification in the way that crypto assets such as Monero are. 
                    Non-fungible tokens can be used to create verifiable digital scarcity. 
                    NFTs are especially useful for any applications that require unique digital items such as digital art, digital-collectibles, and in-game items.</p>
                  
                </div>
              </div>
              <div class="howto-section">
                <div class="one-col">
                  <h1>How to collect ?</h1>
                </div>
                <div class="two-col">
                  <h3>Discover tokenized digital art.</h3>
                  <p>Artists issue authenticated single edition digital artworks. These are certified on the Ethereum blockchain to prevent forgery and provide historical provenance.</p>
                </div>
                <div class="two-col">
                  <h3>Buying & Selling</h3>
                  <p>Purchase at the asking price or make an offer by placing a bid. Once you own a piece you can resell it in the secondary market to other collectors.</p>
                </div>
              </div>
              <div class="whatis-section">
                <div  class="one-col">
                  <h1>What is Izumi NFT Gallery ?</h1>
                  <p>Izumi - NFT Gallery is a NFT Creator and Collector based in Switzerland.<br></br>
                  Izumi's NFTs are both inspired by Japan and technology, they are full of color and have their own unique identity.</p>
                  
                </div>
              </div>
            </div>
            </Section>
            </Parallax.Layer>

            <Parallax.Layer
                factor={1}
                offset={2}
                speed={0.3}
                style={styles}
                class="layerParallax">
            <Section class="content-section">
            <div class="container">
              <div class="one-col" style={one_page}>
                <h2 style={title_page_center}>My collection (Items I own)</h2>
                <h3>Here you will find the NFTs that we collect, acquired on Opensea, Rarible and others, some are for sale, others are not for the moment</h3>
              </div>
              <div class="one-col" style={one_page}>
                <Log
                  seaport={this.seaport}
                  assetType='asset'
                  accountAddress={this.state.accountAddress}
                  owner={'0xea90ec59691c4bf29f9ea75b39fa7b2880580fa1'}
                  singleAsset={false}
                  full = {false}/>
              </div>
            </div>
            </Section>
            </Parallax.Layer>

            <Parallax.Layer
                factor={1}
                offset={3}
                speed={0.3}
                style={styles}
                class="layerParallax">
            <Section class="content-section">
            <div class="container">
            <div class="one-col" style={one_page}>
                <h2 style={title_page_center}>My lasts critics</h2>
              </div>
              <div class="one-col" style={one_page}>
                <Log
                seaport={this.seaport}
                assetType='asset'
                accountAddress={this.state.accountAddress}
                owner={'0x0c1b570912846d3b57bfa44cba915560b69b5382'}
                singleAsset={false}
                full = {false} />
              </div>
            </div>
            </Section>
            </Parallax.Layer>

            <Parallax.Layer
                factor={1}
                offset={4}
                speed={0.4}
                style={styles}
                class="layerParallax">
                <Section class="content-section">
                  <div class="container">
                    <div class="one-col" style={one_page}>
                      <h2 style={title_page_center}>My lasts creations</h2>
                      <h3>Here you will find our NFT creations from each of the collections, future drops will be here or on Rarible, stay tuned!</h3>
                    </div>
                    <div class="one-col" style={one_page}>
                    <Log
                      seaport={this.seaport}
                      assetType='asset'
                      accountAddress={this.state.accountAddress}
                      //orderby='created_date'
                      assetContractAddress={'0x9ffd672a858ff25258f900cc38912b376f472200'}
                      singleAsset={false}
                      full = {false} />
                    </div>
                  </div>
                </Section>
            </Parallax.Layer>
          </main>
        </div>
        </Parallax>
        
        </React.Fragment>
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

  
`