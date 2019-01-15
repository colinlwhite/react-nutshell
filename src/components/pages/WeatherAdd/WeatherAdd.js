import React from 'react';
import {
  Row,
  Col,
  Input,
  Button,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';

const defaultWeather = {
  city: '',
  isCurrent: false,
  state: '',
  uid: '',
};

class WeatherAdd extends React.Component {
  state = {
    newWeather: defaultWeather,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempWeather = { ...this.state.newWeather };
    tempWeather[name] = e.target.value;
    this.setState({ newWeather: tempWeather });
  }

  cityChange = e => this.formFieldStringState('city', e);

   stateChange = e => this.formFieldStringState('state', e);

   formSubmit = (e) => {
     e.preventDefault();
     const { onSubmit } = this.props;
     const newWeather = { ...this.state.newWeather };
     newWeather.uid = authRequests.getCurrentUid();
     onSubmit(newWeather);
     this.setState({ newWeather: defaultWeather });
   }

   render() {
     const { newWeather } = this.state;

     return (
      <div>
        <h2>ADD LOCATION</h2>
        <form onSubmit={this.formSubmit}>
          <Input
            type="text"
            placeholder="Enter City"
            onChange={this.cityChange}
            value={newWeather.city}
          />
          <Row>
            <Col xs="9">
              <Input type="select" onChange={this.stateChange}>
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
              </Input>
            </Col>
            <Col xs="3">
              <Button color="primary" type="submit">ADD</Button>
            </Col>
          </Row>
        </form>
      </div>
     );
   }
}

export default WeatherAdd;
