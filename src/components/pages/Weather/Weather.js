import React from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import weatherRequests from '../../../helpers/data/weatherRequests';
import weatherbitRequests from '../../../helpers/data/weatherbitRequests';
import CurrentLocalWeather from '../CurrentLocalWeather/CurrentLocalWeather';
import WeatherAdd from '../WeatherAdd/WeatherAdd';
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

    weatherRequests.getIsCurrent(this.props.uid)
      .then((currentLocal) => {
      // if isCurrent is true
        if (currentLocal.isCurrent === true) {
        // give function above that information
          this.getWeatherAPI(currentLocal.city, currentLocal.state);
          this.setState({ currentWeather: currentLocal });
        }
      })
      .catch(err => console.error('error', err));
  }

  // DELETE FUNCTION
  deleteItem = (weatherId) => {
    weatherRequests.deleteWeather(weatherId)
    .then(() => {
      weatherRequests.getWeather(this.props.uid)
      .then((weather) => {
        this.setState({ weather });
      });
    }).catch(err => console.error('error deleting', err));
  }

  // POSTING NEW WEATHER LOCATION TO FIREBASE
  formSubmitEvent = (newWeather) => {
    weatherRequests.postRequest(newWeather).then(() => {
      weatherRequests.getWeather(this.props.uid)
        .then((weather) => {
          this.setState({ weather });
        });
    })
      .catch(err => console.error('error in data post', err));
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
        deleteEvent={this.deleteItem}
      />
    ));

    return (
      <div>
        <h1>The Weather</h1>
        <h2>{weatherListings}</h2>
        <CurrentLocalWeather
        key={currentWeather.id}
        apiData={apiData}
        apiWeather={apiWeather}
        currentWeather={currentWeather}
      />
      <WeatherAdd onSubmit={this.formSubmitEvent}
      />
      </div>
    );
  }
}

export default Weather;
