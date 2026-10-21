---
title: "2022-04-20 记录字节前端面试"
description: "1.为什么要用到NextTick2.event loop的宏任务和微任务3.为什么用到虚拟dom节点（这里仍坚持自己的观点，认为它仍是有优化dom节点更新渲染的速度，例如重绘..."
date: 2022-04-20
collection: interview-growth
tags: ["面试"]
readingTime: 1
wordage: 443
originalUrl: "https://www.jianshu.com/p/83c9fa863174"
---
1.为什么要用到NextTick  
2.event loop的宏任务和微任务  
3.为什么用到虚拟dom节点（这里仍坚持自己的观点，认为它仍是有优化dom节点更新渲染的速度，例如重绘和回流，并不是单纯的数据驱动方便更好的团队合作）

DOM性能 浏览器的性能大部分都是被这两个问题所消耗  
重绘：  
DOM树没有元素增加或删除，只是样式的改变，针对浏览器对某一元素进行单独的渲染，这个过程就叫做重绘  
回流：  
DOM树中的元素被增加或者删除，导致浏览器需要重新的去渲染整个DOM树，回流比重绘更消耗性能，发生回流必定重绘，重绘不一定会导致回流。

因为重绘和回流的存在导致真实DOM性能不佳，所以VUE和recat等框架增加了虚拟DOM技术，就是为了减少DOM的重绘和回流从而减少浏览器性能消耗，这就是虚拟DOM的好处，毕竟每次更新回流都会触发每次的真实dom节点渲染。

4.react的diff算法核心  
5.react fiber  
6.JS如何实现异步调度器，例如每次只能允许2个任务一起进行，这里我就直接引用一个例子好了  
[https://blog.csdn.net/weixin\_37680520/article/details/108244727](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fweixin_37680520%2Farticle%2Fdetails%2F108244727)

总结：大部分都能回答了vue的原理和功能，除了部分观点不一样外，还有就是react原理是小白没准备，进出栈题目有点卷
