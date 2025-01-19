/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-14 01:18:35
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-08-14 02:06:42
 * @FilePath: \uni-preset-vue\src\utils\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/plugins/axios.js
import axios from 'axios';
// import axiosAdapterUniapp from 'axios-adapter-uniapp'

// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.199:8989/api', // 基础 API URL
    // adapter: axiosAdapterUniapp, // 使用 uni.request 作为适配器
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
    const token = uni.getStorageSync('token'); // 获取 token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(response => {
    if (response.data.code === 401) {
        uni.removeStorageSync('token');
        uni.navigateTo({ url: '/pages/login/index' });
    }
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
