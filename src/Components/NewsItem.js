import React from 'react';

const NewsItem = ({ title, disc, imgUrl, newsUrl, author, date }) => {
  return (
    <div className='my-3 shadow-sm' style={{ height: "440px" }}>
      <div className="card " >
        <img src={imgUrl} className="card-img-top" style={{ height: "200px" }} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{disc}...</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read more</a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
