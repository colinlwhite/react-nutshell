import React from 'react';
import './CurrentLocalWeather.scss';

class CurrentLocalWeather extends React.Component {
  render() {
    const { apiData, apiWeather } = this.props;
    // make big data object and array to do .length on it
    if (Object.keys(apiData).length === 0) {
      return (
        <div>
            <h1>Choose a location</h1>
        </div>
      );
    }
    return (
  <div>
      <h1>{apiData.city_name}</h1>
      <h1>{apiData.state_code}</h1>
      <h1>{apiData.temp}</h1>
      <h3>{apiWeather.description}</h3>
</div>
    );
  }
}

export default CurrentLocalWeather;
