import React from 'react';
import styled from 'styled-components';
import Parallax from 'react-springy-parallax'
import Log from '../../Log';
import Header from '../../Header';
import CryptHODL from '../Token/img/Short-Squeeze-2.gif';
import Background from './img/Cryptoart.png';
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
      marginBottom: "20px"
    }

    const one_page = {
      width : '100%',
      display : 'inline-block',
      paddingTop : '50px',
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
          <main style={{ backgroundImage : `url(${Background})`, backgroundColor : 'rgb(244, 167, 185)', backgroundRepeat : 'repeat', minHeight : "100vh"}}>
            <Section>
            <div class="container">
              <div class="one-col" style={one_page}>
                <h2 style={title_page_center}>My creations</h2>
                <h6 style={title_page_center}>here you will find our NFT creations from each of the collections, future drops will be here or on Rarible, stay tuned!</h6>
              </div>
              <div class="one-col" style={one_page}>
                <Log
                  seaport={this.seaport}
                  assetType='asset'
                  accountAddress={this.state.accountAddress}
                  assetContractAddress={'0x9ffd672a858ff25258f900cc38912b376f472200'}
                  singleAsset={false}
                  full = {true}/>
              </div>
            </div>
            </Section>
          </main>
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

  .logo-header h1{
    font-size : 120px;
    text-align : center;
    display : block;
  }

  .img-whatis{
    width : 80%;
    margin : auto;
    display : block;
  }

  .whatis-section, .howto-section{
    margin-bottom : 50px;
    text-align : justify;
  }

  .howto-section p{
    text-align : justify;
  }

  .whatis-section .one-col h1, .howto-section .one-col h1{
    font-size : 32px;
  }

  .sub-title-home{
    text-align : center;
    margin-top : 20px;
  }

  .one-col{
    text-align : center;
  }

  .one-col h1{
    display: block;
  }
  
  .two-col{
    width : 50%;
    display : inline-block;
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