import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Jankari Junction`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.country, props.category, page]);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=61736b1bcf844f508777993c1da59481&page=${page}&pageSize=30`;
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: '35px 0', marginTop: '90px' }}>
        JankariJunction - Top {capitalizeFirstLetter(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <div className='row my-4'>
        {!loading &&
          articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ''}
                disc={element.description ? element.description.slice(0, 88) : ''}
                imgUrl={
                  element.urlToImage
                    ? element.urlToImage
                    : 'https://cdn.vox-cdn.com/thumbor/FWV5_OyXa4MHa7oDbcA6XP0x7z8=/0x0:2040x1473/1200x628/filters:focal(1020x737:1021x738)/cdn.vox-cdn.com/uploads/chorus_asset/file/24796679/beatts.jpg'
                }
                newsUrl={element.url}
                author={element.author ? element.author : 'Unknown'}
                date={element.publishedAt}
              />
            </div>
          ))}
        <div className='d-flex justify-content-between'>
          <button
            type='button'
            disabled={page <= 1}
            className='btn btn-dark'
            onClick={handlePrevious}
          >
            &larr; Previous
          </button>
          <button
            type='button'
            disabled={page + 1 > Math.ceil(totalResults / 30)}
            className='btn btn-dark'
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
