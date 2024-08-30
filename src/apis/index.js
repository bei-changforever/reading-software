import router from '@/router';
import axios from 'axios';

import {
    Toast,
    Dialog
} from 'vant';



let service = axios.create({
    baseURL: 'https://apis.netstart.cn/yunyuedu',
    timeout: 15000
})


// 添加请求拦截器                                               
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
    })
    return config;
}, function (error) {
    console.log('请求错误==>',error)
    Toast.clear();
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    Toast.clear();
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Toast.clear();
    Dialog.alert({
        title: error.name,
        message: error.message,
    }).then(() => {
        // on close
        router.push({
            path: '/'
        })
    });
    return Promise.reject(error);
});



export default service