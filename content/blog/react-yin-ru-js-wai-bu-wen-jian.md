---
title: "2019-12-02 react引入js外部文件"
description: "目前比较实用的方法，仍希望更简便的引入寻找其他方法"
date: 2019-12-02
collection: react
tags: ["React"]
readingTime: 1
wordage: 25
originalUrl: "https://www.jianshu.com/p/9ce096ee692f"
---
目前比较实用的方法，仍希望更简便的引入寻找其他方法

```
var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = 'http://127.0.0.1:8080/plugins/jquery.min.js';
document.head.appendChild(script);    
```
