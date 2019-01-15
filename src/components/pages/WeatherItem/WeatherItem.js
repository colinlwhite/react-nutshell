import React from 'react';

class WeatherItem extends React.Component {
  render() {
    const { weather } = this.props;
    return (
      <div>
        <li className="weather-items">
          <span>{weather.city}, </span>
          <span>{weather.state}</span>
        </li>
      </div>
    );
  }
}

export default WeatherItem;
