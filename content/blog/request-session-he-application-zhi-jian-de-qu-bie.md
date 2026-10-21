---
title: "2020-04-02 request,session和application之间的区别"
description: "application：全局作用范围，整个应用程序共享，就是在部署文件中的同一个webApp共享，生命周期为：应用程序启动到停止。session：会话作用域，当用户首次访问时..."
date: 2020-04-02
collection: java-spring
tags: []
readingTime: 1
wordage: 136
originalUrl: "https://www.jianshu.com/p/618050a892ee"
---
application：全局作用范围，整个应用程序共享，就是在部署文件中的同一个webApp共享，生命周期为：应用程序启动到停止。  
session：会话作用域，当用户首次访问时，产生一个新的会话，以后服务器就可以记住这个会话状态。生命周期：会话超时，或者服务器端强制使会话失效。  
request：请求作用域，就是客户端的一次请求。
