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

// import { parse } from 'querystring';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        psNews: [],
        psReviews: [],
        games: []
    }
  };
  componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?sources=ign&apiKey=1c8bd478e1e4431a848b713415a64ba4')
    .then(res => res.json())
    .then(psNews => this.setState({
      psNews
    }))
    .then(data => console.log(data))
    .catch(err => console.log(err))
    let user = userService.getUser();
    this.setState({user});

    
    

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
            
            <Route exct path='/reviews' render={(props)=>
              <PlayStudioReviews
                psReviews={this.state.psReviews}
                />
            }/>
            <Route exact path='/' render={(props) =>
              <PlayStudioPage 
                handleLogout={this.handleLogout}
                user={this.state.user}
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
