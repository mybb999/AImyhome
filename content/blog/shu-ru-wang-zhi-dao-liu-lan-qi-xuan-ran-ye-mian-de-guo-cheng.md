---
title: "输入网址到浏览器渲染页面的过程"
description: "在客户端浏览器中输入网址URL。 发送到DNS(域名服务器)获得域名对应的WEB服务器的IP地址。 客户端浏览器与WEB服务器建立TCP(传输控制协议)连接。 客户端浏览器向..."
date: 2019-02-27
collection: browser-network
tags: []
readingTime: 1
wordage: 230
originalUrl: "https://www.jianshu.com/p/ac21573f7287"
---
1.  在客户端浏览器中输入网址URL。
    
2.  发送到DNS(域名服务器)获得域名对应的WEB服务器的IP地址。
    
3.  客户端浏览器与WEB服务器建立TCP(传输控制协议)连接。
    
4.  客户端浏览器向对应IP地址的WEB服务器发送相应的HTTP或HTTPS请求。
    
5.  WEB服务器响应请求，返回指定的URL数据或错误信息；如果设定重定向，则重定向到新的URL地址。
    
6.  客户端浏览器下载数据，解析HTML源文件，解析的过程中实现对页面的排版，解析完成后，在浏览器中显示基础的页面。
    
7.  分析页面中的超链接，显示在当前页面，重复以上过程直至没有超链接需要发送，完成页面的全部显示。
