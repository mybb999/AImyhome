---
title: "2021-10-12 mobx和state区别和使用"
description: "写下这篇文章前因为之前工作开会上听了同事曾说过不知道为什么状态都放在Mobx仓库里，感觉有点不好，毕竟大家用vue太多了不太理解react和仓库间的关系。但其实用了mobx就..."
date: 2021-10-12
collection: react
tags: []
readingTime: 1
wordage: 525
originalUrl: "https://www.jianshu.com/p/8c16b91319c7"
---
写下这篇文章前因为之前工作开会上听了同事曾说过不知道为什么状态都放在Mobx仓库里，感觉有点不好，毕竟大家用vue太多了不太理解react和仓库间的关系。  
但其实用了mobx就最好不要用state，state无法实时监听Mobx的变化，同时只能在render函数监听Mobx的实时变化，并且若打算通过componentDidUpdate去监听Mobx变化不太明智并且不好使用（同时必须在render函数先取得mobx的数据才能监听）。

1.使用state一般在多个组件间不需要共享状态，仅仅在当前的组件中使用，但相反其实本人觉得很难界定该状态未来的拓展和使用上，是否会因为需求的改变而逐渐需要共享，这点后续再深入；

2.使用mobx一般在多个组件间需要共享状态，但是有个难题就是当需要共享的状态多的时候，action提交改变状态的方法也需要写很多，并不能像vue一样直接直接在data负责实时监听仓库。

3.此外说明一点state无法实时监听仓库，实际上只能监听该初始值，例如：

```
this.state{
  name:this.props.store.status
}
```

4.此时会想到利用render函数去监听mobx再利用setState赋值到state去，但state的机制是实时变化改变render函数重新渲染，所以当你setState改变状态时候会触发render函数重渲染而造成死循环

5.mobx仓库的数组跟我们平常使用的数组有少许区别，mobx有它独特的数组属性，所以当你直接使用Mobx里的数据状态时候会有warning提醒不能直接使用该属性，最好就是利用deep.js深拷贝或其他方式slice()之类复制出来再使用  
此外送上一个深拷贝方法：

```
export const deepClone = (obj) => {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = this.deepClone(obj[key])
      } else {
        objClone[key] = obj[key]
      }
    }
  }
  return objClone
}
```
