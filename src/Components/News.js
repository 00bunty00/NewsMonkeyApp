import React, { useState, useEffect, useRef } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types'


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const dataFetchedRef = useRef(false);

  document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News Monkey`
  

  const fetchNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchNews();
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News Monkey`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles[11]);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setPage(page + 1);
    setTotalResults(parsedData.totalResults)
  }

    return (
      <>
        <h1 className='text-center' style={{marginTop: '5rem'}} >NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={Math.floor(articles.length / props.pageSize) !== Math.floor(totalResults / props.pageSize)}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element)=>{
                return  (<div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 80):""} imageUrl={element.urlToImage?element.urlToImage:"https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/16_09_2022_16_02_59_7354224.jpg?width=920&format=jpeg"} newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
                </div>)
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country : 'in',
  pageSize : 9,
  category : 'general',
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}


export default News