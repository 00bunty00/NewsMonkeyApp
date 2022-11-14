import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className = 'my-3'>
        <div className="card">
            <span className="position-absolute translate-middle badge badge-pill badge-danger" style={{right: "-2%", top: "-2%" }}>{source}</span>
            <img className="card-img-top" src={imageUrl} alt="Card pic cap"/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toLocaleString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem