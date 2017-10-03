import fetch from 'dva/fetch';
import BasicAuth from './BasicAuth';
import Properties from './Properties';

function parseResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  return {
    error: response.status,
    message: response.statusText,
  };
}

export default function (url, options) {
  const token = BasicAuth.getAuth();
  const option = options === null ? {} : options;
  option.headers = {};
  option.headers.Authorization = token;
  option.headers.Accept = 'application/json';
  option.headers['Content-Type'] = 'application/json';
  return fetch(`${Properties.api}${url}`, option).then(parseResponse);
}
