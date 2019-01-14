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

  // SETTING STATE FOR API DATA AND API WEATHER
  getWeatherAPI = (theCity, theState) => {
    weatherbitRequests.getForecast(theCity, theState)
      .then((theWeatherData) => {
        this.setState({
          apiData: theWeatherData,
          apiWeather: theWeatherData.weather,
        });
      })
      .catch(err => console.error('error with getting the weather from API', err));
  }

  getIsCurrent = (uid) => {
    weatherRequests.getIsCurrent(uid)
      .then((currentLocal) => {
      // if isCurrent is true
        if (currentLocal.isCurrent) {
        // give function above that information
          this.getWeatherAPI(currentLocal.city, currentLocal.state);
          this.setState({ currentWeather: currentLocal });
        }
      });
  }


  render() {
    const {
      weather,
      apiData,
      apiWeather,
      currentWeather,
    } = this.state;

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
        <currentLocalWeather
        key={currentWeather.id}
        apiData={apiData}
        apiWeather={apiWeather}
        currentWeather={currentWeather}
      />
      </div>
    );
  }
}

export default Weather;
