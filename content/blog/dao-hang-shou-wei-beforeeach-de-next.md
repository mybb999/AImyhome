---
title: "2020-06-07 导航守卫beforeEach的next"
description: "beforeEach 之 next 在这里我用通俗点的说法解释上next(),next(false),next('/'),next(error)，希望通过这接地气的解释你能掌..."
date: 2020-06-07
collection: vue
tags: []
readingTime: 1
wordage: 397
originalUrl: "https://www.jianshu.com/p/46716ebe7e35"
---
## beforeEach 之 next

在这里我用通俗点的说法解释上`next()`,`next(false)`,`next('/')`,`next(error)`，希望通过这接地气的解释你能掌握这几个知识点。  
**背景：你乘坐汽车从A景区想赶往B景区（模拟路由A跳转到路由B）**  
**1.next()**

> 你乘坐汽车要从A景区到B景区，路过关卡时，守门人拦下你，你量出了next()，守门人一看没问题，赶紧放行，于是你顺利到达了B景区。

**2.next(false)**

> 如果你量出了next(false)，守门人立马关住大门，不让你走，哪都不让你去，你说想换个交通方式，走路或者坐飞机，都不行，老实待在A景区吧

**3.next('/')**

> 你原本打算从A景区到B景区，但是走到关卡的时候由于某些原因改变了主意，想要去C景区，你对守门员量出了next({path:'/C'})，守门员一看，哦，原来你不去B了，要去C啊，去吧去吧，然后你顺利到达了C景区

**4.next(error)**

> 你在出发之前，给你妈妈说，妈，要是有什么事我立马通知你，你记得查看消息啊（你注册了router.onError()）走到中途，出现了意外，你发出next(error)，然后你妈就收到了消息，赶紧打电话问你怎么了（执行router.onError()里的回调）

转：[https://www.cnblogs.com/jimmy1293/p/10271991.html](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fjimmy1293%2Fp%2F10271991.html)
