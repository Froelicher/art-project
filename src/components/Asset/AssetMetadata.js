import React from 'react'

export default class AssetMetadata extends React.Component {
  render() {
    const { asset } = this.props

    return (
      <React.Fragment>
        <a target="_blank" rel="noopener noreferrer" className="text-center d-inline-block m-100" href={asset.openseaLink}>
          <img
            alt="Asset artwork"
            src={asset.imageUrl} />
        </a>
          
        <div className="card-body h-25">
        <a target="_blank" href={asset.openseaLink}><h5 className="card-title">{asset.name}</h5></a>
        </div>
      </React.Fragment>
    )
  }
}