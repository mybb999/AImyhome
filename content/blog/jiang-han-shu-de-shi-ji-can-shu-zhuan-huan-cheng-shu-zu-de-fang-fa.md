---
title: "2021-03-09 将函数的实际参数转换成数组的方法"
description: "方法一：var args = Array.prototype.slice.call(arguments); 方法二：var args = [].slice.call(argu..."
date: 2021-03-09
collection: javascript
tags: []
readingTime: 1
wordage: 27
originalUrl: "https://www.jianshu.com/p/74d19d9172d0"
---
方法一：var args = Array.prototype.slice.call(arguments);

方法二：var args = \[\].slice.call(arguments, 0);

方法三：

```
var args = []; 
for (var i = 1; i < arguments.length; i++) { 
    args.push(arguments[i]);
}
```
