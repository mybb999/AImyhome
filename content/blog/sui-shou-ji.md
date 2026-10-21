---
title: "2019-11-04随手记"
description: "vue的if是条件渲染，show更像是css的display:none和block一样 Object.assign在众多技术博客里第一次为深拷贝，二层为浅拷贝，但实际上它并不..."
date: 2019-11-04
collection: essay
tags: []
readingTime: 1
wordage: 162
originalUrl: "https://www.jianshu.com/p/3fd7c0f32801"
---
vue的if是条件渲染，show更像是css的display:none和block一样

Object.assign在众多技术博客里第一次为深拷贝，二层为浅拷贝，但实际上它并不能真正意义上为深拷贝，若要深拷贝对象可以考虑JSON.parse()和JSON.stringify

computed和watch的区别在于一对多和一对一，同样是监听。computed监听data的属性值，watch除了对data监听并且可以添加方法并做一些逻辑

如果做登陆页面的ticket过期时可以使用导航守卫控制跳转

es6的SET和MAP
