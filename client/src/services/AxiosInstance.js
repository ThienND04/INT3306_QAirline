import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Axios error:', error.message);
        if (error.response && error.response.status === 401) {
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;