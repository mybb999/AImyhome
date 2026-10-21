---
title: "2019-10-09 axios-retry插件一般使用方法"
description: "网上一堆搬运工，各种axios重连然而不起作用，有一种是通过在拦截器的error信息里有个config，只需要在拦截器里面写个定时器+return axios(config)..."
date: 2019-10-09
collection: browser-network
tags: []
readingTime: 1
wordage: 100
originalUrl: "https://www.jianshu.com/p/285a6b3ae4f1"
---
网上一堆搬运工，各种axios重连然而不起作用，有一种是通过在拦截器的error信息里有个config，只需要在拦截器里面写个定时器+return axios(config)可进行重连

```
// 添加响应拦截器
React.Component.prototype.$ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    document.getElementsByClassName("ajaxMask")[0].style.display="flex";
    console.log("错误")    
    setTimeout(function(){            
        return axios(error.config)
    },2000)
       
    return Promise.reject(error);
});
```

上面这种我没有写发送请求次数，下面这种通过插件配合一些人的文档得出以下使用方法

```
//配置axios
axiosRetry(axios, { 
    retries: 1,  //设置自动发送请求次数
    retryDelay: (retryCount) => {        
        return retryCount * 1000;
    },
    shouldResetTimeout:true,
    retryCondition: (error)=>{        
        //true为打开自动发送请求，false为关闭自动发送请求
        //这里的意思是当请求方式为get时打开自动发送请求功能
        return (error.config.method === 'get' || error.config.method === 'post');
    }
});
```
