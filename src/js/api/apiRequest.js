import axios from 'axios';

function buildRequest() {
  const xhrOptions = {
    baseURL: '/',
    timeout: 30000,
    headers: {
      Accept: 'application/json',
    },
  };

  const req = axios.create(xhrOptions);

  req.interceptors.response.use(
    res => res.data,
    res => Promise.reject(res.data.error || { error: { message: 'CoinAPI: Something has gone wrong.' } }),
  );
  return req;
}

export const request = buildRequest();

/**
 * Request movie data from the Swagger service.
 */
export const moviesApi = {
  get: function get() {
    return request.get('api/Movies')
      .then(
        response => ({ data: response }),
        () => ({ error: 'Something has gone wrong when fetching data from the Swagger service.' }),
      )
      .catch(console.log);
  },
};
