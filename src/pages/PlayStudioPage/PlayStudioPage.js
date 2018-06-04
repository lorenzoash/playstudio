import React from 'react';
// import {Link} from 'react-router-dom'
// import NavBar from '../../components/NavBar/NavBar';
import PlayStudioNews from '../../pages/PlayStudioNews/PlayStudioNews';
import './PlayStudioPage.css'


const PlayStudio = (props) => {
    return (
        <div className="PlayStudio">
            <img className='imageHeader' src='https://www.igdb.com/b/e3-discover.png' alt="...">
            </img>
            <h2>Live News</h2>
                <PlayStudioNews
                    psNews={ props.psNews } />
        </div>
    );
};

export default PlayStudio