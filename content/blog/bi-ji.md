---
title: "笔记"
description: "组件里面方法函数内部可以写return标签，在里面render引用渲染模板 react的map函数与es5的map函数不相同，es5内部无法写入标签 渲染列表多使用map()..."
date: 2019-07-04
collection: react
tags: []
readingTime: 1
wordage: 207
originalUrl: "https://www.jianshu.com/p/45fd4e126e64"
---
组件里面方法函数内部可以写return标签，在里面render引用渲染模板

react的map函数与es5的map函数不相同，es5内部无法写入标签

渲染列表多使用map()函数，有点类似vue的v-for

render内部写jsx，外部不写

每个实例方法和属性都必须添加bind(this)  
每次state改变重新渲染，不然要在生命周期里改变  
渲染在render()  
绑定参数直接绑，子组件引用的话要用props中间件绑定  
setstate异步

setstate不改变异步里改变的状态值，只从现有的state值进行改变  
例如a长度为1，改为2；b=a的长度，但是b=a=1，并没有直接等于2
