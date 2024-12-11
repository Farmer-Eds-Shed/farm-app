import axios from 'axios';
import storageService from '../services/storageService';

// Function to initialize Axios instance after URL resolution
const initializeAxios = async () => {
  await storageService.init(); // Ensure storage service is initialized
  const url = await storageService.getItem('url');

  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      "Accept": "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
    },
  });

  axiosInstance.interceptors.request.use(async request => {
    const accessToken = await storageService.getItem('accessToken');
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
          const refreshToken = await storageService.getItem('refreshToken'); // Retrieve the stored refresh token.
          // Make a request to your auth server to refresh the token.
          const refreshResponse = await axios.post(url + '/oauth/token', {
            "grant_type": "refresh_token",
            "refresh_token": refreshToken,
            "client_id" : "farm"
          },
          {
            headers: {
              "Accept": "application/json",
              "content-type": "application/x-www-form-urlencoded",
            }
          });
          const newTokens = refreshResponse.data;
          const access_token = newTokens.access_token;
          const refresh_token = newTokens.refresh_token;
          // Store the new access and refresh tokens.
          await storageService.setItem('accessToken', access_token);
          await storageService.setItem('refreshToken', refresh_token);
          // Update the authorization header with the new access token.
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error('Token refresh failed:', refreshError);
          await storageService.removeItem('accessToken');
          await storageService.removeItem('refreshToken');
          window.location.href = '/settings';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );

  return axiosInstance;
};

// Initialize Axios instance and export
const axiosInstance = await initializeAxios();
export default axiosInstance;