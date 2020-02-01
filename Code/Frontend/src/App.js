import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import CreateAccount  from './components/CreateAccount';
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Header/Layout';
import { NavigationBar } from './components/Header/NavigationBar';
import { Jumbotron } from './components/Header/Jumbotron';
import Login  from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import CreateProfile from './components/CreateProfile';
import { LoggedInNavBar } from './components/Header/LoggedInNavBar';
import CreateEvent from './components/CreateEvent';
import {Schedule} from './components/Schedule';

import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  state={isSignedIn:false}
  uiConfig = {
      signInFlow: "popup",
      signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
          signInSuccess: () => false
      }
  }

  componentDidMount = () =>{
      this.callAPI();

      firebase.auth().onAuthStateChanged(user =>{
          this.setState({isSignedIn: !!user})
      })
  }

  render(){
    return (
      <div className="App">
        <React.Fragment>
        
        {this.state.isSignedIn ? (
        <LoggedInNavBar />) 
        :
        (<NavigationBar />)}
        
         <Jumbotron />
          <Layout>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/createAccount" component={CreateAccount} />
                <Route path="/login" component={Login} />
                <Route path="/passwordRecovery" component={PasswordRecovery} />
                <Route path="/createProfile" component={CreateProfile} />
                <Route path="/createEvent" component={CreateEvent} />
                <Route path="/schedule" component={Schedule} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </Layout>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
