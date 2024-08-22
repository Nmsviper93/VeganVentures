import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import userService from './userService';

const axiosInstance = axios.create({ 
    baseURL: 'https://api.spoonacular.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// interceptor to add JWT token to each request
// axiosInstance.interceptors.request.use(async (config) => {
//     let token = localStorage.getItem('jwtToken');
//     if (token) {
//         const { exp } = jwtDecode(token);
//         if (Date.now() >= exp * 1000) {
//             try {
//                 const response = await axios.post('/api/users/refresh-token', { token });
//                 token = response.data.token;
//                 localStorage.setItem('jwtToken', token);
//             } catch (error) {
//                 userService.logout();
//                 // redirect to login on failure to refresh token
//                 window.location.href = '/login';
//                 throw error;
//             }
//         }
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default axiosInstance;
