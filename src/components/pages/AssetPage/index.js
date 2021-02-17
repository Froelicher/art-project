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

  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 5000)
    throw error
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

  async fulfillOrder() {
    const { order, accountAddress } = this.state
    if (!accountAddress) {
      await connectWallet()
    }
    try {
      this.setState({ creatingOrder: true })
      await this.seaport.fulfillOrder({ order, accountAddress })
    } catch(error) {
      this.onError(error)
    } finally {
      this.setState({ creatingOrder: false })
    }
  }

  renderBuyButton(canAccept = true) {
    const { creatingOrder } = this.state
    const { accountAddress, order } = this.state
    const buyAsset = async () => {
      if (accountAddress && !canAccept) {
        this.setState({
          errorMessage: "You already own this asset!"
        })
        return
      }
      this.fulfillOrder()
    }
    return (
      <button
        disabled={creatingOrder}
        onClick={buyAsset}
        className="btn btn-primary w-100">
        
        Buy{creatingOrder ? "ing" : ""} for <SalePrice order={order} />

      </button>
    )
  }

  renderAcceptOfferButton(canAccept = true) {
    const { creatingOrder } = this.state
    const { accountAddress, order } = this.state
    
    const sellAsset = async () => {
      if (accountAddress && !canAccept) {
        this.setState({
          errorMessage: "You do not own this asset!"
        })
        return
      }
      this.fulfillOrder()
    }
    return (
      <button
        disabled={creatingOrder}
        onClick={sellAsset}
        className={`btn btn-success w-100`}>

        Sell{creatingOrder ? "ing" : ""} for <SalePrice order={order} />

      </button>
    )
  }

  renderExpirationBadge() {
    const expirationTime = parseFloat(this.state.order.expirationTime)

    if (expirationTime <= 0) {
      return null;
    }

    const timeLeft = moment.duration(moment.unix(expirationTime).diff(moment()))

    return (
      <span className="badge bid-expiry-badge red">
        <i className="tiny material-icons">timer</i>
        <span className="expire-label">Expires in </span>
        {timeLeft.humanize()}
      </span>
    )
  }

  async fetchDataAsset(){
    //const { accountAddress } = accountAddress
    console.log("tokenAddress : " + this.props.match.params.tokenAddress);
    console.log("tokenId : " + this.props.match.params.tokenId);
    const singleAsset = await this.seaport.api.getAsset(this.props.match.params.tokenAddress, this.props.match.params.tokenId, 1);
    this.setState({ asset : singleAsset});
    if(singleAsset.orders.length > 0 && this.state.order === undefined){
      this.setState({ order : singleAsset.orders[0]})
    }
  }

  componentDidMount(){
    this.fetchDataAsset();
  }
  

  render() {
    const backgroundPage={
      backgroundImage : `url(${Background})`,
      backgroundColor : 'rgb(225, 107, 140)'
    }

    const { asset, accountAddress, errorMessage, order } = this.state;
    const isOwner = accountAddress && accountAddress.toLowerCase() === asset.owner.address.toLowerCase()


    var usernameOwner = "";

    if(asset != null){
      if(asset.owner.user == null || asset.owner.user.username == null){
        usernameOwner = asset.owner.address.substring(2,8);
      }else if (asset.owner.user.username == 'NullAddress'){
        usernameOwner = 'Multiple owner'
      }else{
        usernameOwner = asset.owner.user.username
      }
    }

    return (
      <div>
        {asset != null
          ? <React.Fragment>
              <Section style={backgroundPage}>
                <div class="container">
                  <div class="title-page">
                    <div class="one-col">
                      <h1>{ asset.name }</h1>
                    </div>
                  </div>
                  <div class="asset-informations">
                    <div class="two-col">
                      { /*image*/ }
                      <img src={asset.imageUrlOriginal}></img>
                    </div>
                    <div class="two-col">
                      { /* Title - Description - Owner - Creator - Price */ console.log(asset)}
                      <p>Collection : {asset.assetContract.name}</p>
                      <p>{asset.description}</p>
                      <p>Owner : <img class="profile_img" src={asset.owner.profile_img_url}></img> {usernameOwner}</p>
                      <p>Owner : <img class="profile_img" src={asset.owner.profile_img_url}></img> {usernameOwner}</p>
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
                  {/*console.log("asset : " + JSON.stringify(asset)) */}
                  {console.log("error : " + errorMessage)}

                  
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

.one-col{
  text-align : left;
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

.profile_img{
  max-height : 30px;
}

`