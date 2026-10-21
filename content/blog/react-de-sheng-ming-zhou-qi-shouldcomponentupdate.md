---
title: "React的生命周期shouldComponentUpdate()"
description: "使用shouldComponentUpdate()以让React知道当前状态或属性的改变是否不影响组件的输出，默认返回ture，返回false时不会重写render，而且该方..."
date: 2019-07-03
collection: react
tags: ["React"]
readingTime: 1
wordage: 90
originalUrl: "https://www.jianshu.com/p/e18eb0e2a67b"
---
使用shouldComponentUpdate()以让React知道当前状态或属性的改变是否不影响组件的输出，默认返回ture，返回false时不会重写render，而且该方法并不会在初始化渲染或当使用forceUpdate()时被调用，我们要做的只是这样：

shouldComponentUpdate(nextProps, nextState) {  
return nextState.someData !== this.state.someData  
}
