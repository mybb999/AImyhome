---
title: "2020-03-27 Proxy与Object.defineProperty的优劣势对比"
description: "Proxy的优势： 可以直接监听对象而非属性可以直接监听数组的变化拦截方式较多Proxy返回一个新对象，可以只操作新对象达到目的，而Object.defineProperty..."
date: 2020-03-27
collection: javascript
tags: []
readingTime: 1
wordage: 109
originalUrl: "https://www.jianshu.com/p/33220667f2a2"
---
Proxy的优势：

可以直接监听对象而非属性  
可以直接监听数组的变化  
拦截方式较多  
Proxy返回一个新对象，可以只操作新对象达到目的，而Object.defineProperty只能遍历对象属性直接修改  
Proxy作为新标准将受到浏览器厂商重点持续的性能优化  
Object.defineProperty的优势如下:

兼容性好,支持IE9
