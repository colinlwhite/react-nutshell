import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import gbutton from './gbutton.png';
import './Auth.scss';

class Auth extends React.Component {
    authenticateUser = (e) => {
      e.preventDefault();
      authRequests.authenticate().then(() => {
        this.props.history.push('/home');
      }).catch(err => console.error('there was an error with auth', err));
    }

    render() {
      return (
        <div className="Auth">
        <button className="btn btn-danger" onClick={this.authenticateUser}>
        <img src={gbutton} alt="google login button"/>
        </button>
        </div>
      );
    }
}

export default Auth;
