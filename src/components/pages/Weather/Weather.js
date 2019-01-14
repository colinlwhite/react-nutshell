import React from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import weatherRequests from '../../../helpers/data/weatherRequests';
import weatherbitRequests from '../../../helpers/data/weatherbitRequests';
import currentLocalWeather from '../currentLocalWeather/currentLocalWeather';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    // firebase json array
    weather: [],
    // main object from the weather API
    apiData: {},
    // 1 object within API DATA object - icon and description
    apiWeather: {},
    // to match firebase 'isCurrent: true' with API DATA
    currentWeather: {},
  }

  componentDidMount() {
    weatherRequests.getWeather(this.props.uid)
      .then((weather) => {
        this.setState({ weather });
      })
      .catch(err => console.error('error with getting the weather', err));
  }

  render() {
    const { weather } = this.state;

    const weatherListings = weather.map(weatherItem => (
      <WeatherItem
        weather={weatherItem}
        key={weatherItem.id}
      />
    ));

    return (
      <div>
        <h1>The Weather</h1>
        <h2>{weatherListings}</h2>
      </div>
    );
  }
}

export default Weather;
