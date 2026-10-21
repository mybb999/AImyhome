---
title: "2019-11-19 callee和caller的区别"
description: "callee就是返回正在执行函数的本身引用caller返回一个函数的引用，这个函数调用了当前的函数。 callee: 返回 caller: 返回"
date: 2019-11-19
collection: javascript
tags: []
readingTime: 1
wordage: 48
originalUrl: "https://www.jianshu.com/p/5a3fd34cae70"
---
callee就是返回正在执行函数的本身引用  
caller返回一个函数的引用，这个函数调用了当前的函数。

callee:

```
var a = function() { 
    alert(arguments.callee); 
} 
var b = function() { 
    a(); 
} 
b();
```

返回

```
alert: function() { 
    alert(arguments.callee); 
}
```

caller:

```
var a = function() { 
    alert(a.caller); 
} 
var b = function() { 
    a(); 
} 
b();
```

返回

```
![image.png](https://upload-images.jianshu.io/upload_images/13747278-1be1d75c05ef9aa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
