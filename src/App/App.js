import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Navbar from '../components/navbar/navbar';
import authRequests from '../helpers/data/authRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  //  isAuthenticated = () => {
  //    this.setState({ authed: true });
  //  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
              <div className='row'>
                <Switch>
                    <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                    <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                    <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
