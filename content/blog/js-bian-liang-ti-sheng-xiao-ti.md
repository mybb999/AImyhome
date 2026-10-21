---
title: "JS变量提升小题"
description: "前阵子被工头秀了一脸变量提升的问题，自己手打一段 输出的是：5,undefind(ReferenceError);上面实际是 原因是：函数里面使用没有定义的变量 就自动提升为..."
date: 2019-03-05
collection: javascript
tags: []
readingTime: 1
wordage: 95
originalUrl: "https://www.jianshu.com/p/996063cf2926"
---
前阵子被工头秀了一脸变量提升的问题，自己手打一段

```
(function(){
var a=b=5;
})()
console.log(b);
console.log(a);
```

输出的是：5,undefind(ReferenceError);  
上面实际是

```
var b;
(function(){
var a;
b=5;
a=b;
})()
console.log(b);
console.log(a);
```

原因是：函数里面使用没有定义的变量 就自动提升为外部作用域定义的变量  
也就是说b没有定义，所以自动提升为全局变量去了  
orz倒
