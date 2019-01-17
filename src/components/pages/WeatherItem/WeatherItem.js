import React from 'react';
import { Button } from 'reactstrap';
import weatherRequests from '../../../helpers/data/weatherRequests';
import authRequests from '../../../helpers/data/authRequests';

class WeatherItem extends React.Component {
  deleteWeather = (e) => {
    e.preventDefault();
    const { deleteEvent, weather } = this.props;
    deleteEvent(weather.id);
  }

  changeTrueToFalse = () => {
    const { updateFirebase } = this.props;
    const uid = authRequests.getCurrentUid();
    weatherRequests.getWeather(uid)
      .then((weatherArray) => {
        const findTrueWeather = weatherArray.filter(x => x.isCurrent === true);
        const grabFirstIndexOfArray = findTrueWeather[0];
        const setToFalse = false;
        const falseId = grabFirstIndexOfArray.id;
        updateFirebase(falseId, setToFalse);
      });
  }

  updateWeather = (e) => {
    e.preventDefault();
    const { updateFirebase, weather } = this.props;
    this.changeTrueToFalse();
    updateFirebase(weather.id, !weather.isCurrent);
  }

  render() {
    const { weather } = this.props;
    return (
      <div>
        <li className="weather-items">
          <span>{weather.city}, </span>
          <span>{weather.state}</span>
          <span><Button id={weather.id} onClick={this.updateWeather} color="primary">MAKE CURRENT</Button></span>
          <span><Button onClick={this.deleteWeather} color="danger">DELETE</Button></span>
        </li>
      </div>
    );
  }
}

export default WeatherItem;
