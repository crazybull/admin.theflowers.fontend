import axios from 'axios'
import {baseURL} from './config'
let instance = axios.create({
    baseURL
});
//添加请求拦截
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance