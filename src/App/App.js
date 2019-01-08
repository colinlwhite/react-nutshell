import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import Navbar from '../components/navbar/navbar';
import authRequests from '../helpers/data/authRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
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

   isAuthenticated = () => {
     this.setState({ authed: true });
   }

   render() {
     const logoutClickEvent = () => {
       authRequests.logoutUser();
       this.setState({ authed: false });
     };

     if (!this.state.authed) {
       return (
        <div className="App">
        <Navbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
       <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
       );
     }
     return (
      <div className="App">
      <Navbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
      You are authenticated!
      </div>
     );
   }
}

export default App;
