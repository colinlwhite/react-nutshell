import axios from 'axios';
import apiKeys from '../apiKeys';


const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

// GETTING AN ARRAY OF THE 2 CITY STATES FROM FIREBASE JSON DATA UNIQUE TO THE USER
const getWeather = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const weatherObject = result.data;
      const weatherArray = [];
      if (weatherObject != null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteWeather = weatherId => axios.delete(`${firebaseUrl}/weather/${weatherId}.json`);

// GETTING THE 1 OBJECT THAT HAS ISCURRENT TRUE
const getIsCurrent = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const weatherObject = result.data;
      const weatherArray = [];
      if (weatherObject != null) {
        Object.keys(weatherObject).forEach((weatherId) => {
          weatherObject[weatherId].id = weatherId;
          weatherArray.push(weatherObject[weatherId]);
        });
      }
      // FINDING THE ISCURRENT TRUE BOOLEAN FROM THE ARRAY
      // The find method returns the value of the first element in the array that satisfies the provided testing function
      const isCurrent = weatherArray.find(x => x.isCurrent);
      resolve(isCurrent);
    })
    .catch((error) => {
      reject(error);
    });
});

const patchIsCurrent = (weatherId, isCurrent) => axios.patch(`${firebaseUrl}/weather/${weatherId}.json`, { isCurrent });

const postRequest = weather => axios.post(`${firebaseUrl}/weather.json`, weather);

export default {
  deleteWeather,
  getIsCurrent,
  getWeather,
  patchIsCurrent,
  postRequest,
};
