import React from 'react';
import { Button } from 'reactstrap';

class WeatherItem extends React.Component {
  deleteWeather = (e) => {
    e.preventDefault();
    const { deleteEvent, weather } = this.props;
    deleteEvent(weather.id);
  }

  render() {
    const { weather } = this.props;
    return (
      <div>
        <li className="weather-items">
          <span>{weather.city}, </span>
          <span>{weather.state}</span>
          <span><Button onClick={this.deleteWeather} color="danger">DELETE</Button></span>
        </li>
      </div>
    );
  }
}

export default WeatherItem;
