import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import CreateAccount  from './CreateAccount';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import Login  from './Login';
import PasswordRecovery from './PasswordRecovery';
import CreateProfile from './CreateProfile';
import { LoggedInNavBar } from './components/LoggedInNavBar';
import CreateEvent from './CreateEvent';
import {Schedule} from './Schedule';

import firebase from 'firebase';

class App extends Component {
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
