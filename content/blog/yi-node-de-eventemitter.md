---
title: "一、node的EventEmitter"
description: "node的回调函数可以处理异步编程例子： 输出 无论是回调函数还是事件循环，都离不开一个监听者。 Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回..."
date: 2019-03-04
collection: server-db
tags: ["Node.js"]
readingTime: 1
wordage: 343
originalUrl: "https://www.jianshu.com/p/e635f5dcf800"
---
node的回调函数可以处理异步编程  
例子：

```
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
```

输出

```
$ node main.js
程序执行结束!
菜鸟教程官网地址：www.runoob.com
```

无论是回调函数还是事件循环，都离不开一个监听者。

Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

Node.js 几乎每一个 API 都是支持回调函数的。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.  
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

简单用法：

```
/event.js 文件
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { //绑定事件和处理函数
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); //触发
}, 1000); 
```

具体参数参考菜鸟教程：[http://www.runoob.com/nodejs/nodejs-event.html](http://www.runoob.com/nodejs/nodejs-event.html)
