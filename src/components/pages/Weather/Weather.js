import React from 'react';
import weatherRequests from '../../../helpers/data/weatherRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    weather: [],
  }

  gettingWeather = (uid) => {
    weatherRequests.getWeather(uid).then((results) => {
      console.log(results.data);
      this.setState({ weather: results.data });
    })
      .catch(err => console.error('error getting the weather', err));
  };

  render() {
    const { weather } = this.state;
    const uid = authRequests.getCurrentUid();
    // gettingWeather();
    return (
      <div>
        <h2>is it at least back connecting with no erros?</h2>
        <h2>{weather.city_name}</h2>
      </div>
    );
  }
}

export default Weather;
