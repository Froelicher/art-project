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
      lineHeight: '10px',
      color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
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
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(1)}
                onScroll={() => this.refs.parallax.scrollTo(1)}>
                Izumi Art - NFT Artworks
            </Parallax.Layer>
          <main>
          <Parallax.Layer
                offset={1}
                speed={-0.1}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(2)}>
                OnScr
            <Section>
            <div class="how-section">
              <div class="four-col">
                <h2>How to collect digital art ?</h2>
              </div>
              <div class="four-col">
                <h4>DISCOVER TOKENIZED DIGITAL ART.</h4>
                <p>Artists issue authenticated single edition digital artworks. These are certified on the Ethereum blockchain to prevent forgery and provide historical provenance.</p>
              </div>
              <div class="four-col">
                <h4>BUYING & SELLING</h4>
                <p>Purchase at the asking price or make an offer by placing a bid. Once you own a piece you can resell it in the secondary market to other collectors.</p>
              </div>
              <div class="four-col">
                <h4>SHOWCASE YOUR COLLECTION</h4>
                <p>Customize your profile to show off your art collection to patrons around the world. Display your works in a VR gallery, digital display, or anywhere else you like.</p>
              </div>
            </div>
            </Section>
            </Parallax.Layer>
            <Parallax.Layer
                offset={2}
                speed={0.5}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(3)}>
                <Log
                seaport={this.seaport}
                accountAddress={this.state.accountAddress} />
            </Parallax.Layer>
            
            <Parallax.Layer
                offset={3}
                speed={0.5}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(0)}>
                <Section>
                  <div class="title-section">
                    <h2>About me</h2>
                  </div>
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
                </Section>
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
  .how-section{
    padding-top : 60px;
    width : 80%;
    margin : auto;
  }
  .four-col{
    width : 25%;
    display : inline-block;
    padding : 20px;
    height : 100%;
    vertical-align : top;
  }
  .four-col h4{
    vertical-align : top;
    font-size : 8pt;
    color : #000;
    font-weight : 700;
  }
`