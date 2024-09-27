/* https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde */
import axios from 'axios';
import { Storage } from '@ionic/storage';

const store = new Storage();
await store.create();
let url = await store.get('url');

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      "Accept": "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
    },
  });

  axiosInstance.interceptors.request.use(async request => {
    const accessToken = await store.get('accessToken');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });


  axiosInstance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const refreshToken = await store.get('refreshToken'); // Retrieve the stored refresh token.
          // Make a request to your auth server to refresh the token.
          const response = await axios.post(url + '/oauth/token', {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          // Store the new access and refresh tokens.
          await store.set('accessToken', accessToken);
          await store.set('refreshToken', newRefreshToken);
          // Update the authorization header with the new access token.
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error('Token refresh failed:', refreshError);
          await store.remove('accessToken');
          await store.remove('refreshToken');
          window.location.href = '/settings';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );


  

  //API get request
  export const fetchData = async (endpoint: any) => {
    try {
      const response = await axiosInstance.get('/api/' + endpoint);
      console.log('Data successfully fetched:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  