import React from 'react';
import styled from 'styled-components';
import Parallax from 'react-springy-parallax'
import Log from '../../Log';
import Header from '../../Header';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';

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
      fontFamily: 'Menlo-Regular, Menlo, monospace',
      fontSize: 14,
      lineHeight: '18px',
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
      fontSize: 42
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

          <Parallax.Layer offset={0} speed={1} style={{ backgroundColor: '#243B4A' }} />
          <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
          <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
          <Parallax.Layer offset={3} speed={1} style={{ backgroundColor: '#FFF' }} />

          <Parallax.Layer
                offset={0}
                speed={0.5}
                style={header}
                onClick={() => this.refs.parallax.scrollTo(1)}
                onScroll={() => this.refs.parallax.scrollTo(1)}>
                <h1>MrCryptHODL - Cryptoart 'n' NFT</h1>
                <div style={buttonBottom}>
                  <p>Go to bottom</p>
                </div>
            </Parallax.Layer>
          <main>
          <Parallax.Layer
                offset={1}
                speed={0.5}
                style={styles}
                class="layerParallax"
                onClick={(e) =>  { if(e.target.classList.contains('layerParallax')) {this.refs.parallax.scrollTo(2); console.log(e.target.classList)} }}>
            <Section>
            <div class="container">
              <div class="whatis-section">
                <div class="one-col">
                  <h2 style={title_page}>Cryptoart and NFT ?</h2>
                </div>
                <div  class="two-col">
                  <h4>Non-fungible token</h4>
                  <p>NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain. NFTs are unique digital items such as collectibles or artworks or game items. As an artist, by tokenizing your work you both ensure that it is unique and brand it as your work. The actual ownership is blockchain-managed.
                  </p>
                </div>
                <div class="two-col">
                  <h4>Non-fungible token</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices vestibulum lorem, id tempor risus mattis vitae.
                    Proin egestas ut eros ut vehicula. Quisque sit amet enim congue erat laoreet accumsan. 
                    Praesent volutpat neque eu erat venenatis, ac maximus lectus volutpat. Duis accumsan diam a lacinia porttitor. Cras nec augue nec nunc ultricies consectetur.
                    Praesent sed sem augue. Nam sagittis quis sem quis auctor. Nunc efficitur nisl ultricies, viverra tellus non, pellentesque magna. Nulla varius porttitor velit.
                  </p>
                </div>
              </div>
              <div class="how-section">
                <div class="one-col">
                  <h2 style={title_page}>How to collect digital art ?</h2>
                </div>
                <div class="three-col">
                  <h4>DISCOVER TOKENIZED DIGITAL ART.</h4>
                  <p>Artists issue authenticated single edition digital artworks. These are certified on the Ethereum blockchain to prevent forgery and provide historical provenance.</p>
                </div>
                <div class="three-col">
                  <h4>BUYING & SELLING</h4>
                  <p>Purchase at the asking price or make an offer by placing a bid. Once you own a piece you can resell it in the secondary market to other collectors.</p>
                </div>
                <div class="three-col">
                  <h4>SHOWCASE YOUR COLLECTION</h4>
                  <p>Customize your profile to show off your art collection to patrons around the world. Display your works in a VR gallery, digital display, or anywhere else you like.</p>
                </div>
              </div>
            </div>
            </Section>
            <div style={buttonBottom}>
                  <p class="layerParallax">Go to bottom</p>
            </div>
            </Parallax.Layer>
            <Parallax.Layer
                offset={2}
                speed={0.5}
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
            
            <Parallax.Layer
                offset={3}
                speed={0.5}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(0)}>
                <Section>
                  <div class="one-col">
                    <div class="title-section">
                      <h2>About me</h2>
                    </div>
                  </div>
                  <div class="one-col">
                    <div class="about-section">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper quam nec orci semper, in aliquet diam tempor. 
                        Donec erat mauris, facilisis interdum pulvinar non, dapibus nec ipsum. Maecenas imperdiet pharetra ornare. 
                        Fusce imperdiet mi sed mattis ornare. Praesent gravida lacus ipsum, in facilisis tortor sodales nec. In laoreet finibus lorem, laoreet tincidunt purus. 
                        Nunc in quam ut diam vulputate condimentum. Nam sit amet dolor posuere lorem volutpat mattis vitae sit amet nisl. Donec vestibulum volutpat pulvinar. 
                        Nulla facilisi. Vestibulum ultrices tempus nibh non facilisis. Vestibulum id accumsan metus.</p>
                      <p>
                      Ut ultrices tincidunt velit, ut interdum odio auctor non. Donec a urna mi. Integer congue semper turpis at feugiat. 
                      Fusce et arcu vitae lacus interdum fermentum nec ac lectus. Fusce cursus neque est, id tempus lacus ultrices vitae. Vestibulum in hendrerit elit, at dictum nisi. 
                      Cras pulvinar, justo rutrum mattis pulvinar, sapien odio accumsan magna, nec tincidunt nulla ligula id orci. Mauris non sem magna.
                      </p>
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

  .whatis-section{
    padding-top : 30px;
  }
  .one-col{
    width : 100%;
  }
  .two-col{
    width : 49%;
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
`