import React from 'react';
import moment from 'moment'
import styled from 'styled-components';
import Log from '../../Log';
import Header from '../../Header';
import SalePrice from '../../common/SalePrice';
import { connectWallet } from '../../../constants';
import { OrderSide } from 'opensea-js/lib/types';
import Background from '../Home/img/texture.png';
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../../constants';

//const SingleAsset = ({match, location})

export default class AssetPage extends React.Component {

  state = {
    accountAddress: null,
    asset: undefined,
    order: undefined,
    creatingOrder: false,
    errorMessage: null
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


  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    throw error
  }

  render() {
    return (
      <Log
        seaport={this.seaport}
        assetType='asset'
        accountAddress={this.state.accountAddress}
        //orderby='created_date'
        assetContractAddress={this.props.match.params.tokenAddress}
        token_id={this.props.match.params.tokenId}
        singleAsset = {true}
        full = {false} />
      /*<div>
        {asset != null
          ? <React.Fragment>
              <Section style={backgroundPage}>
                <div class="container">
                  <div class="asset-informations">
                    <div class="two-col">
                      { /*image }
                      <img src={asset.imageUrlOriginal}></img>
                    </div>
                    <div class="two-col">
                      { /* Title - Description - Owner - Creator - Price }
                      <h1>{ asset.name }</h1>
                      <h4>Collection</h4> 
                      <p>{asset.assetContract.name}</p>
                      <h4>Description</h4>
                      <p>{asset.description === null
                          ? "No description found"
                          : asset.description
                          }</p>
                      <h4>Owner</h4>
                      <p><img class="profile_img" src={asset.owner.profile_img_url}></img> {usernameOwner}</p>
                      {order != undefined
                      ? <p>Price : {console.log("ORDER : " + order)}
                        {order.side === OrderSide.Buy
                          ? this.renderAcceptOfferButton(isOwner)
                          : null
                        }
                        {order.side === OrderSide.Sell
                          ? this.renderBuyButton(!isOwner)
                          : null
                        }</p>
                      : null
                      }
                    </div>
                  </div>
                  {/*console.log("asset : " + JSON.stringify(asset)) }
                  {console.log("error : " + errorMessage)}

                  
                </div>
              </Section>
            </React.Fragment>
          : <h1>Not found</h1>
        }
      </div>*/
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

h1{
  padding-bottom : 30px;
}

.asset-informations{
  margin-top : 50px;
}

.asset-informations h4{
  text-decoration : underline;
}

.two-col{
  width : 50%;
  display : inline-block;
  height : 100%;
  vertical-align : top;
  padding : 20px;
}

.two-col:first-child{
  padding-left : 0px;
}

.two-col:last-child{
  padding-right : 0px;
}

.two-col p{
  padding-right : 20px;
}
.two-col:last-child p{
  padding-right : 0px;
}

.profile_img{
  max-height : 30px;
}

`