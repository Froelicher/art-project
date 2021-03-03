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
import OpenSeaLogo from './img/opensea-logomark-white.png';
import SalePrice from '../common/SalePrice';
import * as XLSX from 'xlsx';
import f  from '../../critics/critics.xlsx';

const Card = styled.div.attrs({ className: "card mx-2 mb-4" })`
  width : 100%;
  min-width: 200px;
  background : #fff;
  border : none;
  padding : 10px;
  border : solid 1px #640106;
  img {
    height: 200px;
    max-width: 100%;
  }
  img.small {
    max-width: 50%;
    height: 60px;
  }
  a h5.card-title{
    color : #640106;
    text-align : center;
    margin-bottom : 0px;
    font-weight : bold;
    font-size: 18px;
  }

  .list-group-item{
    background : none;
    text-align : center;
    padding : 0;
    color : #e00613;
    font-size : 14px;
  }

  .list-group-flush{
    border : none;
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
    text-align : center;
    margin : auto;
    display : block;
    color : #e00613 !important;
  }
`

export default class Asset extends React.Component {

  state = {
    errorMessage: null,
    creatingOrder: false,
    orderState : null,
    order : null
  }

  static propTypes = {
    currentAccount: PropTypes.object,
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string,
    assetContractAddress : PropTypes.string,
    token_id : PropTypes.string,
    owner : PropTypes.string,
    orderby: PropTypes.string,
    singleAsset : PropTypes.bool,
    order : PropTypes.object,
    asset : PropTypes.object,
    full : PropTypes.bool.isRequired
  }

  

  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    throw error
  }

  async fulfillOrder() {
    const { accountAddress, order } = this.props
    console.log(order)
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
    console.log(this.props)
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


  render() {
    const { errorMessage } = this.state
    var { accountAddress, asset, order } = this.props
    var owner = null

    const backgroundPage={
      backgroundImage : `url(${Background})`,
      backgroundColor : 'rgb(225, 107, 140)',
      minHeight : '100vh'
    }


    if(asset != null){
      owner = asset.owner;
    }

    if(order != null && asset != null){
      owner = asset.owner;
    }else if(order != null && asset == null){
      owner = order.asset.owner;
      asset = order.asset
    }

    var usernameOwner = ''
    var isOwner = false;

    if(owner != null){
      if(owner.user == null || owner.user.username == null){
        usernameOwner = owner.address.substring(2,8);
      }else if (owner.user.username == 'NullAddress'){
        usernameOwner = 'Multiple owner'
      }else{
        usernameOwner = owner.user.username
      }

      isOwner = accountAddress && accountAddress.toLowerCase() === owner.address.toLowerCase()
    }
    


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
      /*var name = f.name;
      const reader = new FileReader();
      reader.onload = (evt) => { // evt = on_file_select event
          /* Parse data */
          /*const bstr = evt.target.result;
          const wb = XLSX.read(bstr, {type:'binary'});
          /* Get first worksheet */
        /*  const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
        /*  const data = XLSX.utils.sheet_to_csv(ws, {header:1});
          /* Update state */
         /* console.log("Data>>>"+data);
      };
      reader.readAsBinaryString(f);*/
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
                      {console.log(asset)}
                      <a target="_blank" href={asset.openseaLink}><img src={OpenSeaLogo} class="opensea-button"></img></a>
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
                      ? <p>Price : 
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

.opensea-button{
  max-width : 50px;
  margin-bottom : 15px;
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

.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
  color: #b90000;
  background-color: #ffffff;
  border-color: #b90000;
  font-weight : bold;
}

.btn-primary:active:focus{
  box-shadow : none !important;
}

.btn-primary:focus{
  box-shadow : none !important;
}

.btn-primary{
  color: #ffffff;
  background-color: #b90000;
  border-color: #b90000;
  font-weight : bold; 
}

.btn-primary:hover {
  color: #b90000;
  background-color: #ffffff;
  border-color: #b90000;
  font-weight : bold;
}
  
`  