let axios = require('axios');

let axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    // baseURL: 'http://ec2-3-15-164-109.us-east-2.compute.amazonaws.com:8080/',
});

module.exports = axiosInstance;
