
import axios from 'axios';

// Defina a URL base da sua API
axios.defaults.baseURL = 'http://localhost:8080'; 

// Interceptador para adicionar o token em cada requisição
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;
