import React from 'react';
// import NavBar from '../../components/NavBar/NavBar';
import {Link} from 'react-router-dom'
import './PlayStudioGames.css'

const PlayStudioGames = ({games}) => {

    return (
        
        <ul className='PlayStudioGames'>
        {games ? games.map((playGames, index) => {
            // let coverURL;
            // if (playGames.cover) {
            //     const size = "cover_big";
            //     const hash = playGames.cover.id;
            //     coverURL =`https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`
            // } else {
            //     coverURL = ""
            // }
            return (
                <div key={index}>
                    <img className='PlayGames' src={ playGames.cover ? playGames.cover.url.replace("t_thumb", "t_cover_big") : "https://bit.ly/2LIZDag" } />
                    <h5>{playGames.name}</h5>
                    <p>{playGames.rating}</p>
                
                </div>
            )
        })
        : <h1>LOADING</h1>}
        </ul>
    )
};

export default PlayStudioGames;