import React, { Component } from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import igdb from 'igdb-api-node';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import PlayStudioPage from '../../pages/PlayStudioPage/PlayStudioPage'
import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import API from './../../api/api.js';
// import SelectSystems from '../../pages/SelectSystem/SelectSystem';
import PlayStudioNews from '../../pages/PlayStudioNews/PlayStudioNews'; 
import NavBar from '../../components/NavBar/NavBar';
import PlayStudioReviews from '../../pages/PlayStudioReviews/PlayStudioReviews'; 
import PlayStudioGames from '../../pages/PlayStudioGames/PlayStudioGames';

// import { parse } from 'querystring';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        psNews: [],
        psReviews: [],
        games: [],
        userSearch: '',
        searchGames: [],
        searchResults: []
    }
  };
  componentDidMount() {
    this.setState({user: userService.getUser()});

    fetch('/api/news')
    .then(res => res.json())
    .then(psNews => this.setState({psNews}))
    .catch(err => console.log(err));

    fetch('/api/news/games')
    .then(res => res.json())
    .then(games => {
      this.setState({games})
      // wont get the reviews until all games are returned
      fetch('/api/news/reviews')
        .then(res => res.json())
        .then(psReviews => this.setState({psReviews}))
        .catch(err => console.log(err));

      //
      var arr = [];
      for (let index = 0; index < games.length; index++) {
        fetch(`/api/news/reviews/${games[index].id}`) 
        .then(res => res.json())
        .then(psReviews => {
          arr.push(psReviews)
        })
        .catch(err => console.log(err));
      }
      this.setState({psReviews: arr})
      //

    }
    )
    .catch(err => console.log(err));



    
    

    // fetch('https://api-2445582011268.apicast.io/games/637')
    // .then(res => res.json())
    // .then(psReviews => this.setState({
    //   psReviews
    // }))
    // .then(data => console.log(data))
    // .catch(err => console.log(err))

  };
  // componentDidMount() {
  //   // this.updateNews(this.state.selectSystem);
  //   let user = userService.getUser();
  //   this.setState({user});
   
  // };

    // .then(data => this.props.data.map(articles => ([{
  //   author: `${articles.author}`,
  //   description: `${articles.description}`,
  //   title: `${articles.title}`,
  //   urlToImage: `${articles.urlToImage}`
  // }
  // ])))
  
  
  updateNews = (system) => {
    this.setState(() =>({
      selectSystem: system,
      psNews: null
    }));

    API.fetchGameNews(system)
      .then((data) => {
        this.setState({
          selectSystem: system,
          psNews: data
        })
      })
  };
  

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  };

  handleSignUp = () => {
    this.setState({user: userService.getUser()})
  }

  handleLogin = () => {
    this.setState({user: userService.getUser()})
  }

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
  


  render() {
    // const {psNews} = this.state;
    return (
      <div className="App">
        <header className="App-header"> 
        <NavBar 
          user={this.state.user}
          handleLogout={this.handleLogout}
          />
        </header>
          <Switch>
              <Route exact path='/news' render={(props) =>
                <PlayStudioNews
                psNews={this.state.psNews}
       
              />
              }/> 
            <Route exact path='/games' render={(props) =>
              <PlayStudioGames
                games={this.state.games}
              
                />
              }/>
            <Route exct path='/reviews' render={(props)=>
              <PlayStudioReviews
                games={this.state.games}
                psReviews={this.state.psReviews}
                />
            }/>
            <Route exact path='/' render={(props) =>
              <PlayStudioPage 
                handleLogout={this.handleLogout}
                user={this.state.user}
                psNews={this.state.psNews}
              />
            }/>
            <Route exact path='/login' render={(props) => 
              <LoginPage
                {...props}
                handleLogin={this.handleLogin}
             />
            }/>
             <Route exact path='/signup' render={(props) => 
              <SignupPage 
              {...props}
              handleSignUp={this.handleSignUp}
                
              />
            }/>

               {/* <SelectSystems updateSystem={this.updateSystem}
                              selectSystem={this.state.selectSystem} />
              !this.state.psNews
                ?<p>LOADING</p>
                :<PlayStudioNews psNews={this.state.psNews.items} />}  */}
          </Switch>       
      </div>
    );
  }
}

export default App;
