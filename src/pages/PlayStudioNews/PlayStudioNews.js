import React from 'react';
// import NavBar from '../../components/NavBar/NavBar';
import {Link} from 'react-router-dom'

const PlayStudioNews = ({psNews}) => {

    return (
        
        <ul className='PlayStudioNews'>
        {psNews.articles ? psNews.articles.map((news, index) => {
            return (
                <div key={index}>
                   
                    <p>{news.title}</p>
                    <p>{news.publishedAt}</p>
                    <p>{news.descripition}</p>
                    <img src={news.urlToImage} />
                    <Link to={news.url}></Link>
                   
                </div>
                
            )
        })
        : <h1>LOADING</h1>}
        </ul>
    )
};

export default PlayStudioNews;