---
title: "2021-02-07 document.getElementsByClassName获取的类数组转化为数组的方法"
description: "2021-02-07 document.getElementsByClassName获取的类数组转化为数组的方法"
date: 2021-02-07
collection: javascript
tags: []
readingTime: 1
wordage: 109
originalUrl: "https://www.jianshu.com/p/1d55de3e6a7b"
---
```
var arr = document.getElementsByClassName("abc"); 
var arr2= Array.prototype.slice.call(arr); 
console.log(arr2)
```
