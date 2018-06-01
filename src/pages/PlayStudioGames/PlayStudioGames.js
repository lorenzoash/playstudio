import React from "react";
// import NavBar from '../../components/NavBar/NavBar';
import { Link } from "react-router-dom";
import "./PlayStudioGames.css";

const PlayStudioGames = ({ games, user, addToFavorite }) => {
  return (
    <div className="container">
      <div className="row">
        {games ? (
          games.map((playGames, index) => {
            return (
              <div key={index} className="col-sm PlayStudioGames">
                <div>
                  <Link to={`/games/${playGames.id}`}>
                    {" "}
                    <img
                      className="PlayGames"
                      src={
                        playGames.cover
                          ? playGames.cover.url.replace(
                              "t_thumb",
                              "t_cover_big"
                            )
                          : "https://bit.ly/2LIZDag"
                      }
                    />
                  </Link>
                  <p>{playGames.name}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>LOADING</h1>
        )}
      </div>
    </div>
  );
};

export default PlayStudioGames;
