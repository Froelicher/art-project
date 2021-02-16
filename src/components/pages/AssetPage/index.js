import React from 'react';
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import Background from '../Home/img/texture.png';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';

//const SingleAsset = ({match, location})

export default class AssetPage extends React.Component {

  state = {
    accountAddress: null,
    asset: undefined
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

  async fetchDataAsset(){
    //const { accountAddress } = accountAddress
    console.log("tokenAddress : " + this.props.match.params.tokenAddress);
    console.log("tokenId : " + this.props.match.params.tokenId);
    const singleAsset = await this.seaport.api.getAsset(this.props.match.params.tokenAddress, this.props.match.params.tokenId, 1);
    this.setState({ asset : singleAsset});
  }

  componentDidMount(){
    this.fetchDataAsset();
  }
  

  render() {
    const backgroundPage={
      backgroundImage : `url(${Background})`,
      backgroundColor : 'rgb(225, 107, 140)'
    }
    const { asset } = this.state;
    return (
      <div>
        {asset != null
          ? <React.Fragment>
              <Section style={backgroundPage}>
                <div class="container">
                  {console.log("asset : " + JSON.stringify(this.state.asset))}

                  <h1>{ asset.name }</h1>
                </div>
              </Section>
            </React.Fragment>
          : <h1>Not found</h1>
        }
      </div>
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