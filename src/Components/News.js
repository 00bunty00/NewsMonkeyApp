import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 9,
    category : 'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
      // next: false
    }
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - News Monkey`
  }

  fetchNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults, 
      loading: false
    })
    this.props.setProgress(100);

    // this.props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // this.props.setProgress(30);
    // let parsedData = await data.json()
    // this.props.setProgress(70);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false, 
    // })
    // this.props.setProgress(100);

  }

  async componentDidMount(){
    this.fetchNews();
  }

  // fetchMoreData = () => {
  //   this.fetchNews(1);
  // }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles[11]);
    this.setState({
      page: this.state.page + 1,
      articles : this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults 
      })
    // console.log(this.state.articles.length);
  }

  render() {
    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines </h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={Math.floor(this.state.articles.length / this.props.pageSize) !== Math.floor(this.state.totalResults / this.props.pageSize)}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element)=>{
                return  (<div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 80):""} imageUrl={element.urlToImage?element.urlToImage:"https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/16_09_2022_16_02_59_7354224.jpg?width=920&format=jpeg"} newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
                </div>)
              })}
            </div>
          </div>
        </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}

export default News