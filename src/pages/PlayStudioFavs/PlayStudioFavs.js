import React from 'react';
import {Link} from 'react-router-dom'
import './PlayStudioFavs.css'

const PlayStudioFavs = ({games, user, favorites}) => {

    return (
        <div className="container">
            <div className="row">
                {favorites.length ? favorites.map((fav, index) => {
                    return (
                        <div key={index} className='col-sm PlayStudioGames'>
                            <div>
                                <Link to={`/games/${fav.apiId}`}> <img className='PlayGames' src={fav.cover ? fav.cover.replace("t_thumb", "t_cover_big") : "https://bit.ly/2LIZDag"} /></Link>
                                <p>{fav.name}</p>
                            </div>
                        </div>
                    )
                })
                : 
                null}
            </div>
        </div>
    );
};

export default PlayStudioFavs;