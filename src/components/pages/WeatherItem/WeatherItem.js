import React from 'react';
import { Button } from 'reactstrap';

class WeatherItem extends React.Component {
  deleteWeather = (e) => {
    e.preventDefault();
    const { deleteEvent, weather } = this.props;
    deleteEvent(weather.id);
  }

  updateWeather = (e) => {
    e.preventDefault();
    console.log('the button works');
  }

  render() {
    const { weather } = this.props;
    return (
      <div>
        <li className="weather-items">
          <span>{weather.city}, </span>
          <span>{weather.state}</span>
          <span><Button onClick={this.updateWeather} color="primary">MAKE CURRENT</Button></span>
          <span><Button onClick={this.deleteWeather} color="danger">DELETE</Button></span>
        </li>
      </div>
    );
  }
}

export default WeatherItem;
