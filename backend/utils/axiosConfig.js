import axios from 'axios';

const newsDataAxios = axios.create({
    baseURL: 'https://newsdata.io/api/1',
    params: {
        apikey: process.env.NEWSDATA_API_KEY || "pub_84876ab99a2b0b5f0c9479d72bb9305b19346" ,
        category: 'technology',
        country: 'ng,ke,gh,za,us', // Match your Postman params
        language: 'en'
    },
    timeout: 15000 // Add timeout
});

// Add request interceptor to log requests
newsDataAxios.interceptors.request.use(config => {
    console.log('Making request to:', config.url);
    console.log('Params:', config.params);
    return config;
});

// Add response interceptor to log responses
newsDataAxios.interceptors.response.use(
    response => {
        console.log('Response from NewsData:', {
            status: response.status,
            dataCount: response.data?.results?.length || 0
        });
        return response;
    },
    error => {
        console.error('NewsData API Error:', {
            message: error.message,
            response: error.response?.data,
            config: error.config
        });
        return Promise.reject(error);
    }
);


// Regular axios instance for internal API calls
const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true
});

export { newsDataAxios, api };