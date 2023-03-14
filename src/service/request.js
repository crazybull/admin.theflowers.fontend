import axios from 'axios'
import {baseURL,timeout,method,token} from './config'
let instance = axios.create({
    method,
    baseURL,
    timeout
});
/**
 * 设置请求拦截器：----在项目中发请求（请求没有发出去）可以做一些事情
 * 客户端->[请求拦截器]->服务器端
 * token校验（JWT）：接收到服务器的token,存储到vuex/本地存储中，每次向服务器发送请求，我们应该把token带上
 * config :发起请求的请求配置项
 */
instance.interceptors.request.use(function (config) {
    console.log(config);
    let token=localStorage.getItem('token')||token
    token && (config.headers.Authoriztion=token)
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 设置响应拦截器
 * 服务器端返回信息->[响应拦截器]->客户端js获取到信息
 * response中包含属性：
 * data：相应数据,status:响应状态码,statusText：响应状态信息,headers：响应头,config：响应提供的配置信息,request
 */

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
});

export default instance