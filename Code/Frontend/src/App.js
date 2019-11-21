import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import CreateAccount from './CreateAccount';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import Login from './Login';
import { Schedule } from './Schedule';
import PasswordRecovery from './PasswordRecovery';

class App extends Component {

  render(){
    return (
      <div className="App">
        <React.Fragment>
          <NavigationBar />
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
