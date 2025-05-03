import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const searchFlights = (from, to) =>
  API.get('/flights', { params: { from, to } });
