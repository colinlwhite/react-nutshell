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

    // Calling getIsCurrent returns 1 element
    weatherRequests.getIsCurrent(this.props.uid)
      .then((currentLocal) => {
      // if the 1 element is there?
        if (currentLocal) {
        // pass its city and state values to
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

  // UPDATE FIREBASE / FUNCTION
  updateItem = (weatherId, isCurrent) => {
    // patchIsCurrent TAKES 2 PARAMETERS - WHICH ID AND THE BOOLEAN
    weatherRequests.patchIsCurrent(weatherId, isCurrent)
      .then(() => {
        // NEED TO SET ALL WEATHER FIREBASE ARRAY TO FALSE
        // SET THE 1 WEATHER ITEM I CLICKED TO TRUE
        // GETTING FRESH DATA
        weatherRequests.getWeather(this.props.uid)
          .then((weather) => {
            // SETTING STATE AGAIN
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
        updateFirebase={this.updateItem}
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
