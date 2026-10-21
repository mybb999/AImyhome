---
title: "setState是同步还是异步？"
description: "1.在组件生命周期中或者react事件绑定中，setState是通过异步更新的。2.在延时的回调或者原生事件绑定的回调中调用setState不一定是异步的。 这个结果并不说明..."
date: 2019-07-24
collection: react
tags: []
readingTime: 1
wordage: 147
originalUrl: "https://www.jianshu.com/p/7363a82f9359"
---
1.在组件生命周期中或者react事件绑定中，setState是通过异步更新的。  
2.在延时的回调或者原生事件绑定的回调中调用setState不一定是异步的。

这个结果并不说明setState异步执行的说法是错误的，更加准确的说法应该是setState不能保证同步执行。

Dan Abramov也多次提到今后会将setState改造为异步的

例如react实例里写的方法函数和componentDidMount都是异步，原生onclick和setinterval之类的为同步
