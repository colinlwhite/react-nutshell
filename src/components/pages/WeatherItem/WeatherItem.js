import React from 'react';
import { Label, Input } from 'reactstrap';
import weatherRequests from '../../../helpers/data/weatherRequests';

class WeatherItem extends React.Component {
  state = {

  }

  updateFirebase = (e) => {
    e.preventDefault();
    const weatherId = this.props.weather.id;
    const isTheCurrent = this.props.weather.isCurrent;
    weatherRequests.patchIsCurrent(weatherId, isTheCurrent)
      .then(() => {
        console.log(this.props.weather.isCurrent);
        weatherRequests.getWeather(this.props.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { weather } = this.props;
    return (
      <div>
        <li className="weather-items">
          <span>{weather.city}, </span>
          <span>{weather.state}</span>
      <Label check>
            <Input type="radio" onChange={this.updateFirebase} />
      </Label>
        </li>
      </div>
    );
  }
}

export default WeatherItem;
