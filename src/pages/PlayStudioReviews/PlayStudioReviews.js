import React from 'react';
// import NavBar from '../../components/NavBar/NavBar';
import {Link} from 'react-router-dom'
import './PlayStudioReviews.css'

const PlayStudioReviews = (props) => {
    
    return (
        
        <ul className='PlayStudioReviews'>
        {props.psReviews ? props.psReviews.map((reviews, index) => {
            console.log(props.games);
            
            
            let gameTitle = '';
            for ( let i=0; i < props.games.length; i++) {
                if(props.games[i].id === reviews.game) {
                    console.log(props.games[i].id + " === " + reviews.game);
                    
                    gameTitle = props.games[i].name
                }
            }

            return (
                <div key={index}>
                   
                    <p id="gameTitle">{gameTitle}</p>
                    <p>{reviews.content}</p>
                    <p>{reviews.descripition}</p>
                 
                    

                   
                </div>
                
            )
        })
        : <h1>LOADING</h1>}
        </ul>
    )
};

export default PlayStudioReviews;