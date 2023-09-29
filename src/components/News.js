import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from 'axios';


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const uppercaseAll = str => str.toUpperCase();

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
      let data = await fetch(url);
      props.setProgress(40);
      let parseData = await data.json();
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
      props.setProgress(100);
  }

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    document.title = `News - ${capitalizeFirstLetter(props.category)}`
    updateNews();
  }, [])

// // use when you want to use button for next or previous
//   const handlePrevieClick = async () => {
//     setPage(page - 1)
//     updateNews()
//   };

//   const handleNextClick = async () => {
//     setPage(page + 1)
//     updateNews()
//   };

const fetchMoreData = async () => {
  setPage(page + 1);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  setArticles(prevArticles => prevArticles.concat(parseData.articles));
  setTotalResults(parseData.totalResults);
};


    return (
      <div className="container my-3 pt-5">
        <h2 className="container my-3 text-center">TOP HEADLINES ABOUT - {uppercaseAll(props.category)}</h2>
        <hr className="border border-danger border-2 opacity-50 mb-5" />
        {loading && <Spinner/>}
          {/* {!this.state.loading && this.state.articles.map((element) => { */}
          <InfiniteScroll
           dataLength={articles.length}
           next={fetchMoreData}
           hasMore={articles.length !== totalResults}
           loader={<Spinner />}
          >
          <div className="container">
          <div className="row">
          {articles.map((element, index) => {
            return (
              <div className="col-md-4 my-3" key={index} style={{ height: "100%" }}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
          </div>
          </InfiniteScroll>

          {/* this is below buttons for use to jump to next or previous page*/}

        {/* <div className="container my-4 d-flex justify-content-around p-2 mb-2 bg-secondary text-white">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-danger" onClick={this.handlePrevieClick}> Previous &#8678;</button>
          <h3 className="container my-3 text-center">Page - {this.state.page}</h3>
          <button type="button"  disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))} className="btn btn-danger" onClick={this.handleNextClick}> Next &#8680; </button>
        </div> */}
      </div>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
}

export default News;
