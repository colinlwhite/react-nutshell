import React from 'react';

class WeatherItem extends React.Component {
  render() {
    const { weather } = this.props;
    return (
      <div>
          <h2>{weather.city}, {weather.state}</h2>
      </div>
    );
  }
}

export default WeatherItem;
