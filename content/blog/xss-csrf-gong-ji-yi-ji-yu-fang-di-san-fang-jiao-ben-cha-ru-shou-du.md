---
title: "2022-04-08 XSS、CSRF攻击以及预防第三方脚本插入手段"
description: "引用例子，防御手段在链接里：https://blog.csdn.net/qq46658751/article/details/123441204[https://blog...."
date: 2022-04-08
collection: browser-network
tags: ["安全"]
readingTime: 1
wordage: 225
originalUrl: "https://www.jianshu.com/p/09a1fe02831a"
---
引用例子，防御手段在链接里：[https://blog.csdn.net/qq\_46658751/article/details/123441204](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fqq_46658751%2Farticle%2Fdetails%2F123441204)

XSS全程Cross Site Scripting，名为跨站脚本攻击，是一种常见于 Web 应用中的计算机安全漏洞  
XSS攻击可以分为3类：反射型（非持久型）、存储型（持久型）、基于DOM。

CSRF，即 Cross Site Request Forgery，名为跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。  
通常情况下，CSRF攻击是攻击者借助受害者的Cookie骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在未授权的情况下执行在权限保护之下的操作。
