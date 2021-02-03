import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Account from '../Account'
import AssetMetadata from './AssetMetadata'
import BundleMetadata from './BundleMetadata'
import styled from 'styled-components';
import { connectWallet } from '../../constants';
import { OrderSide } from 'opensea-js/lib/types';
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
    creatingOrder: false
  }

  static propTypes = {
    currentAccount: PropTypes.object,
    asset: PropTypes.object.isRequired,
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
  }

  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    throw error
  }

  /*async fulfillOrder() {
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
  }*/

  render() {
    const { errorMessage } = this.state
    const { asset } = this.props

    console.log("ICI : ", asset)
    const owner = asset.owner
    return (
      <Card>
        <AssetMetadata asset={asset} /> 
        
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Owned by <b>{owner.user.username}</b>
          </li>
        </ul>
        <div className="card-footer">
          <small className="text-muted">Collection : <b>{asset.assetContract.name}</b></small>
        </div>
      </Card>
    )
  }
}
