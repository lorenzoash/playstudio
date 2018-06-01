import React from 'react';
import './PlayStudioNews.css';

const PlayStudioNews = ({psNews}) => {
    return (
        <div className='row'>
        {psNews ? psNews.map((news, index) => {
            return (
                <div className="col-sm">
                <div key={index}>
                   <div className='container'>
                    <p>{news.title}</p>       
                </div>
                   <a href={news.url} target='blank'> <img className="imageNews"src={news.urlToImage} /> </a>
                    </div>
                </div>  
            )})
        :
         <h1>LOADING</h1>}
        </div>   
    )};

export default PlayStudioNews;

