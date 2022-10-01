import axios from 'axios'

const ApiFn = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'origin-name': window.location.origin.toString()
    },
    _retry: false
  });
  const API = ApiFn();
  export default API;