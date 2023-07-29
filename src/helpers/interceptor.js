import axios from 'axios';
import store from '../redux/store/store';
import { logout } from '../redux/actions/auth';
// import {toast} from 'react-hot-toast'
console.log("api url", process.env.REACT_APP_API_URL)
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const storeData = store.getState();
  const token = storeData?.authReducer?.token || "";
  if (token) {
    config.headers.accesstoken = token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response?.data?.statusCode === 401) {
    // toast.error("You are Logged out");
    localStorage.clear()
    // window.location.href = process.env.REACT_APP_PUBLIC_URL;
    store.dispatch(logout())
    console.log(response)
  }
  return response?.data;
}, function (error) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default instance;