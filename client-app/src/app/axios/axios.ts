import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.params = {};
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    config.params.token = token;
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
    const { status, data, config, headers, statusText } = error.response;
    return Promise.reject(data);
})

export const getAxios = () => {
    return axios;
}



