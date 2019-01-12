import React from 'react';
import './Weather.scss';

class Weather extends React.Component {
  render() {
    const { weather } = this.props;
    return (
      <div>
        <h2>{weather.city_name}</h2>
      </div>
    );
  }
}

export default Weather;
