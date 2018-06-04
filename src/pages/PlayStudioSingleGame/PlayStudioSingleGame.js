import React from "react";
import "./PlayStudioSingleGame.css";

const PlayStudioSingleGame = ({ game, user, addToFavorite }) => {
  return game ? (
    <div className="singleGameRating">
        <h1 className="title">{game.name}</h1>
      <img
        className="SingleGame"
        src={
          game.cover
            ? game.cover.url.replace("t_thumb", "t_cover_big_2x")
            : "https://bit.ly/2LIZDag"
        } alt="..."
      />
      {/* <div className="c100 p25">
        <div className="c100" />
        <span className="circle">{game.aggregated_rating}</span>
        <div className="slice">
          <div className="bar" />
          <div className="fill" />
        </div>
      </div> */}
      {user &&
        !user.favorites.some(f => f.apiId === game.id.toString()) && (
          <div className="btn btn-danger" onClick={() => addToFavorite(game)}>
            {" "}
            Favorite
          </div>
        )}
      <p className="summary">{game.summary}</p>
    </div>
  ) : null;
};

export default PlayStudioSingleGame;
