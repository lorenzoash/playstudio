import React, { Component } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import LoginPage from "../LoginPage/LoginPage";
import PlayStudioPage from "../../pages/PlayStudioPage/PlayStudioPage";
import userService from "../../utils/userService";
import SignupPage from "../SignupPage/SignupPage";
import API from "./../../api/api.js";
import PlayStudioNews from "../../pages/PlayStudioNews/PlayStudioNews";
import NavBar from "../../components/NavBar/NavBar";
// import PlayStudioReviews from "../../pages/PlayStudioReviews/PlayStudioReviews";
import PlayStudioGames from "../../pages/PlayStudioGames/PlayStudioGames";
import PlayStudioSingleGame from "../../pages/PlayStudioSingleGame/PlayStudioSingleGame";
import tokenService from "../../utils/tokenService";
import PlayStudioFavs from "../PlayStudioFavs/PlayStudioFavs";

// import { parse } from 'querystring';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      psNews: [],
      psReviews: [],
      games: [],
      userSearch: "",
      searchGames: [],
      
    };
  }
  componentDidMount() {
    this.setState({ user: userService.getUser() });
    if (userService.getUser()) {
      fetch("/api/users/favorites", {
        headers: {
          Authorization: "Bearer " + tokenService.getToken()
        }
      })
        .then(res => res.json())
        .then(favs => (this.state.user.favorites = favs))
        .catch(err => console.log(err))
        
    }

    fetch("/api/news")
      .then(res => res.json())
      .then(psNews => this.setState({ psNews }))
      .catch(err => console.log(err));

    fetch("/api/news/games")
      .then(res => res.json())
      .then(games => {
        this.setState({ games });
        // wont get the reviews until all games are returned
        fetch("/api/news/reviews")
          .then(res => res.json())
          .then(psReviews => this.setState({ psReviews }))
          .catch(err => console.log(err));

       
      })
      .catch(err => console.log(err));
  }

  updateNews = system => {
    this.setState(() => ({
      selectSystem: system,
      psNews: null
    }));

    API.fetchGameNews(system).then(data => {
      this.setState({
        selectSystem: system,
        psNews: data
      });
    });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignUp = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  // searchGames = () => {
  //   fetch('api/news/games/seaRch', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({userSearch: this.state.userSearch})
  //   })
  //   .then(data => data.json())
  //   .then(searchResults => {
  //     this.setState({
  //       searchResults: searchResults
  //     })
  //     this.props.history.push('/results')
  //   })
  //   .catch(err => console.log(err))
  // }

  addToFavorite = newGame => {
    fetch(`/api/games/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenService.getToken()
      },
      body: JSON.stringify({
        apiId: newGame.id,
        title: newGame.name,
        rating: newGame.rating,
        cover: newGame.cover.url
      })
    })
      .then(res => res.json())
      .then(user => this.setState({ user }));
  };

  render() {
    // const {psNews} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        </header>
        <Switch>
          <Route
            exact
            path="/news"
            render={props => <PlayStudioNews psNews={this.state.psNews} />}
          />
          <Route
            exact
            path="/games/:game_id"
            render={props => (
              <PlayStudioSingleGame
                addToFavorite={this.addToFavorite}
                user={this.state.user}
                game={this.state.games.find(
                  game => game.id == props.match.params.game_id
                )}
              />
            )}
          />
          <Route
            exact
            path="/favorites"
            render={props => (
              <PlayStudioFavs favorites={this.state.user ? this.state.user.favorites : []} />
            )}
          />
          <Route
            exact
            path="/games"
            render={props => (
              <PlayStudioGames
                games={this.state.games}
                addToFavorite={this.addToFavorite}
                user={this.state.user}
              />
            )}
          />
          {/* <Route
            exct
            path="/reviews"
            render={props => (
              <PlayStudioReviews
                games={this.state.games}
                psReviews={this.state.psReviews}
              />
            )}
          /> */}
          <Route
            exact
            path="/"
            render={props => (
              <PlayStudioPage
                handleLogout={this.handleLogout}
                user={this.state.user}
                psNews={this.state.psNews}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginPage {...props} handleLogin={this.handleLogin} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignupPage {...props} handleSignUp={this.handleSignUp} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
