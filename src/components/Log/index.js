import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Order from '../Order';
import Asset from '../Asset';
import { OrderSide, OpenSeaAsset } from 'opensea-js/lib/types';
import { connectWallet } from '../../constants';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired,
    assetType: PropTypes.string.isRequired,
    accountAddress: PropTypes.string,
    assetContractAddress: PropTypes.string,
    token_id : PropTypes.string,
    owner : PropTypes.string,
    orderby : PropTypes.string,
    singleAsset : PropTypes.bool,
    full : PropTypes.bool.isRequired
  };

  state = {
    orders: undefined,
    assets : undefined,
    total: 0,
    side: undefined,
    onlyForMe: false,
    onlyByMe: false,
    onlyBundles: false,
    page: 1
  };

  componentDidMount() {
    if(this.props.assetContractAddress != null){
      if(this.props.singleAsset == false){
        if(this.props.assetType == 'order'){
          this.fetchData();
        }else{
          this.fetchDataAssets();
        }
      }else{
          this.fetchDataAsset();
      }
    }

    if(this.props.owner != undefined){
      if(this.props.assetType == 'order'){
        this.fetchDataByOwner();
      }else{
        this.fetchDataAssetsByOwner();
      }
    }
  }

  async fetchData() {
    const { accountAddress, assetContractAddress } = this.props
    const { orders, count } = await this.props.seaport.api.getOrders({
      maker: this.state.onlyByMe ? accountAddress : undefined,
      owner: this.state.onlyForMe ? accountAddress : undefined,
      side: this.state.side,
      bundled: this.state.onlyBundles ? true : undefined,
      // Possible query options:
      asset_contract_address : assetContractAddress,
      order_direction : 'desc'
      //asset_contract_address : '0x495f947276749ce646f68ac8c248420045cb7b5e'
      // 'taker'
      //token_id : '43181488428587264351855320964023839419292599949489173029142631053139820675073'
      //token_ids
      // 'sale_kind'
      
    }, this.state.page)
    this.setState({ orders, total: count})
    
  }

  async fetchDataByOwner() {
    const { accountAddress, assetContractAddress } = this.props
    const { owner } = this.props
    const { orders, count } = await this.props.seaport.api.getOrders({
      maker: this.state.onlyByMe ? accountAddress : undefined,
      owner: this.state.onlyForMe ? accountAddress : undefined,
      side: this.state.side,
      bundled: this.state.onlyBundles ? true : undefined,
      // Possible query options:
      //asset_contract_address : assetContractAddress,
      owner : owner,
      order_direction : 'desc'
      
    }, this.state.page)
    console.log(orders)
    this.setState({ orders, total: count})
    
  }

  async fetchDataAssets(){
    const { accountAddress, assetContractAddress, orderby } = this.props
    const { assets, count } = await this.props.seaport.api.getAssets({
      asset_contract_address : assetContractAddress,
      order_by : orderby,
      tokenId : null,
      order_direction : 'desc'
    }, this.state.page)
    this.setState({ assets, total : count});
  }

  async fetchDataAssetsByOwner(){
    const { owner, orderby } = this.props
    const { assets, count } = await this.props.seaport.api.getAssets({
      owner : owner,
      order_by : orderby,
      order_direction : 'desc'
    }, this.state.page)
    this.setState({assets, total : count});
  }

  async fetchDataAsset(){
    const { assetContractAddress, token_id } = this.props
    const singleAsset = await this.props.seaport.api.getAsset(assetContractAddress, token_id, 1);
    this.setState({ assets : singleAsset});
    if(singleAsset.orders.length > 0 && this.state.orders === undefined){
      this.setState({ orders : singleAsset.orders[0]})
    }
  }

  paginateTo(page) {

    console.log("address contract : " + this.props.assetContractAddress)
    console.log("asset type : " + this.props.assetType)
    console.log("asset type : " + this.props.owner)

    if(this.props.assetContractAddress != null){
      if(this.props.assetType == 'order'){
        this.setState({ orders: undefined, page }, () => this.fetchData())
      }else{
        this.setState({ orders: undefined, page }, () => this.fetchDataAssets())
      }
    }

    if(this.props.owner != undefined){
      if(this.props.assetType == 'order'){
        this.setState({ orders: undefined, page }, () => this.fetchDataByOwner())
      }else{
        this.setState({ orders: undefined, page }, () => this.fetchDataAssetsByOwner())
      }
    }

    
  }

  toggleSide(side) {
    if (this.state.side === side) {
      side = undefined
    }
    this.setState({
      orders: undefined,
      side,
      onlyForMe: undefined
    }, () => this.fetchData())
  }

  async toggleForMe() {
    const { accountAddress } = this.props
    if (!accountAddress) {
      await connectWallet()
    }
    const { onlyForMe } = this.state
    this.setState( {
      orders: undefined,
      onlyForMe: !onlyForMe,
      onlyByMe: false,
      // Doesn't make sense to show sell orders the user makes
      side: onlyForMe ? undefined : OrderSide.Buy,
    }, () => this.fetchData())
  }

  toggleBundles() {
    const { onlyBundles } = this.state
    this.setState( {
      orders: undefined,
      onlyBundles: !onlyBundles,
      onlyByMe: false,
      // Only sell-side for now
      side: OrderSide.Sell,
    }, () => this.fetchData())
  }

  async toggleByMe() {
    const { accountAddress } = this.props
    if (!accountAddress) {
      await connectWallet()
    }
    const { onlyByMe } = this.state
    this.setState( {
      orders: undefined,
      onlyByMe: !onlyByMe,
      onlyForMe: false
    }, () => this.fetchData())
  }

  renderPagination() {
    const { page, total } = this.state
    const ordersPerPage = this.props.seaport.api.pageSize
    const noMorePages = page*ordersPerPage >= total
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={"page-item " + (page === 1 ? "disabled" : "")}>
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(page - 1)} tabIndex="-1">
              Previous
            </a>
          </li>
          <li className={"page-item " + (noMorePages ? "disabled" : "")}>
            <a className="page-link" href="#Log"
              onClick={() => this.paginateTo(page + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  renderFilters() {
    const { onlyByMe, onlyForMe, onlyBundles } = this.state
    const sellSide = this.state.side === OrderSide.Sell
    const buySide = this.state.side === OrderSide.Buy

    return (
      <div className="row">
        <div className="mb-3 ml-4">
          Filter orderbook:
          <div className="btn-group ml-4" role="group">
            <button type="button" className={"btn btn-outline-primary " + (sellSide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Sell)}>
              Auctions
            </button>
            <button type="button" className={"btn btn-outline-success " + (buySide ? "active" : "")} data-toggle="button" onClick={() => this.toggleSide(OrderSide.Buy)}>
              Bids
            </button>
          </div>
        </div>
        <div className="mb-3 ml-4">
          <div className="btn-group" role="group">
            <button type="button" className={"btn btn-outline-secondary " + (onlyForMe ? "active" : "")} data-toggle="button" onClick={() => this.toggleForMe()}>
              For Me
            </button>
            <button type="button" className={"btn btn-outline-secondary " + (onlyByMe ? "active" : "")} data-toggle="button" onClick={() => this.toggleByMe()}>
              By Me
            </button>
          </div>
        </div>
        <div className="mb-3 ml-4">
          <button type="button" className={"btn btn-outline-info " + (onlyBundles ? "active" : "")} data-toggle="button" onClick={() => this.toggleBundles()}>
            Bundles
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { orders } = this.state
    const { assets } = this.state
    const { full } = this.props
    var boolAsset = false
    var boolOrder = false

    if(orders != null && assets != null){
      boolOrder = true;
      boolAsset = false;
    }else if(orders != null && assets == null){
      boolOrder = true;
      boolAsset = false;
    }
    
    if (assets != null){
      boolAsset = true;
      boolOrder = false;
    }

    console.log(assets)

    if(this.props.singleAsset == false){
      return (
        
        <div className="container py-3" id="Log">
          {
          
          boolOrder == true
            ? <React.Fragment>
                <div className="card-deck">
                  {
                  full == false 
                  ? orders.map((order, i) => {
                    if(i <= 2)
                      return <Asset {...this.props} key={i} order={order}  />
                  })
                  : orders.map((order, i) => {
                      return <Asset {...this.props} key={i} order={order}  />
                  })
                  }
                </div>
                {
                full == true
                ? this.renderPagination()
                : null
                }

              </React.Fragment>
          
            :  boolAsset == true
          
              ? <React.Fragment>
                  <div className="card-deck">
                    {
                    full == false
                    ? assets.map((asset, i) => {
                      if(i <= 2)
                        return <Asset {...this.props} key={i} asset={asset}  />
                      
                    })
                    : assets.map((asset, i) => {
                        return <Asset {...this.props} key={i} asset={asset}  />
                      
                    })
                    }
                  </div>
                  {
                  full == true
                  ? this.renderPagination()
                  : null
                  }
                </React.Fragment>

              : <div className="text-center">Loading...</div>
          }

          {/*orders != null
          
          ? <React.Fragment>
              <Header>
                <div class="title-section">
                  <h2>Recent activity</h2>
                </div>
              </Header>
              <div className="card-deck">
                {orders.map((order, i) => {
                  if(i <= 2)
                    return <Order {...this.props} key={i} order={order}  />
                })}
              </div>
            </React.Fragment>

          : <div className="text-center">Loading...</div>
              */}
        </div>
      )
    }else{
      return(
        <div>
         { assets != null
           ? console.log(assets.orders[0])
           : null
         } 
        {
          boolOrder == true && assets != null
          ? <Asset {...this.props} order={orders} asset={assets}/>
          : null
        }
        {
          boolAsset == true && assets != null
          ? <Asset {...this.props} asset={assets} order={assets.orders[0]}/>
          : null
        }
        </div>
        
      )
    }
  }
}

const Header = styled.header`
  width : 100%;
  text-align : center;
  padding-bottom : 20px;
  padding-top : 20px;
`
const Section = styled.section`
  width : 100%;
  text-align : justify;
  padding-bottom : 40px;

  h2{
    text-align : center;
    padding-bottom : 20px;
    padding-top : 20px;
  }
`
