import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Account from '../Account'
import AssetMetadata from './AssetMetadata'
import BundleMetadata from './BundleMetadata'
import styled from 'styled-components';
import { connectWallet } from '../../constants';
import { OrderSide } from 'opensea-js/lib/types';
import Background from '../pages/Home/img/texture.png';
import SalePrice from '../common/SalePrice';

const Card = styled.div.attrs({ className: "card mx-2 mb-4" })`
  width : 100%;
  min-width: 200px;
  background : none;
  border : none;
  img {
    height: 200px;
    max-width: 100%;
  }
  img.small {
    max-width: 50%;
    height: 60px;
  }
  a h5.card-title{
    color : #000;
    text-align : center;
    margin-bottom : 0px;
  }

  .list-group-item{
    background : none;
    text-align : center;
    padding : 0;
  }

  .card-body{
    padding-bottom : 0px;
    padding-top : 10px;
  }

  .card-footer{
    background : none;
    color : #fff;
    padding : 0px;
  }

  .card-footer .text-muted{
    color : #fff !important;
    text-align : center;
    margin : auto;
    display : block;
  }
`

export default class Asset extends React.Component {

  state = {
    errorMessage: null,
    creatingOrder: false,
    orderState : null
  }

  static propTypes = {
    currentAccount: PropTypes.object,
    asset: PropTypes.object,
    order: PropTypes.shape({
      makerAccount: PropTypes.object
    }),
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string,
    assetContractAddress : PropTypes.string,
    owner : PropTypes.string,
    orderby: PropTypes.string,
    singleAsset : false
  }

  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    throw error
  }

  async fulfillOrder() {
    const { order, accountAddress } = this.props
    if (!accountAddress) {
      await connectWallet()
    }
    try {
      this.setState({ creatingOrder: true })
      await this.props.seaport.fulfillOrder({ order, accountAddress })
    } catch(error) {
      this.onError(error)
    } finally {
      this.setState({ creatingOrder: false })
    }
  }

  renderBuyButton(canAccept = true) {
    const { creatingOrder } = this.state
    const { accountAddress, order } = this.props
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
    const { accountAddress, order } = this.props
    
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
    const expirationTime = parseFloat(this.props.order.expirationTime)

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

  render() {
    const { errorMessage } = this.state
    var { asset, accountAddress } = this.props
    const { order } = this.props
    var owner = null

    const backgroundPage={
      backgroundImage : `url(${Background})`,
      backgroundColor : 'rgb(225, 107, 140)',
      minHeight : '100vh'
    }

    if(asset != null){
      owner = asset.owner;
    }

    if(order != null){
      owner = order.asset.owner;
      asset = order.asset;
    }

    console.log(asset.tokenAddress);

    var usernameOwner = ''

    if(owner.user == null || owner.user.username == null){
      usernameOwner = owner.address.substring(2,8);
    }else if (owner.user.username == 'NullAddress'){
      usernameOwner = 'Multiple owner'
    }else{
      usernameOwner = owner.user.username
    }

    const isOwner = accountAddress && accountAddress.toLowerCase() === owner.address.toLowerCase()

    if(!this.props.singleAsset){
      return (
        <Card>
          <AssetMetadata asset={asset} /> 
          
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Owned by <b>{usernameOwner}</b>
            </li>
          </ul>
          <div className="card-footer">
            <small className="text-muted">Collection : <b>{asset.assetContract.name}</b></small>
          </div>
        </Card>
      )
    }else{
      return(
        <div>
        {asset != null
          ? <React.Fragment>
              <Section style={backgroundPage}>
                <div class="container">
                  <div class="asset-informations">
                    <div class="two-col">
                      { /*image*/ }
                      <img src={asset.imageUrlOriginal}></img>
                    </div>
                    <div class="two-col">
                      { /* Title - Description - Owner - Creator - Price */}
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
}
