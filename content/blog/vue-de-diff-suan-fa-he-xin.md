---
title: "2021-03-18 vue的diff算法核心"
description: "patch,someVnode,patchVnode,updataChildren 深度优先，同层比较 根据tagname和key进行比较 根据oldVnode和newVno..."
date: 2021-03-18
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 261
originalUrl: "https://www.jianshu.com/p/fbaaf50d5970"
---
patch,someVnode,patchVnode,updataChildren

深度优先，同层比较

根据tagname和key进行比较

根据oldVnode和newVnode比较

1.someVnode根据标签名，name，属性等比较

2.patchVnode根据oldVnode是否有孩子，newVnode是否有孩子，新旧节点是否有相同文本，新旧节点是否都有子节点，四种方案

3.updataChildren是核心，新旧节点通过someVnode和patchVnode进行第一轮比较。

第二轮值得深入比较则按照新规则，按照新旧节点首尾比较，有四种方案，例如旧首对新首，旧首对新尾等。

若四种方案都错误则判断有无key值，有key值在比较过程中会根据key值判断是否相同节点，避免隐蔽bug，同时增加虚拟dom渲染的patch效率。

第三轮处理过剩的dom节点，一般批量增加或批量删除

若StartIdx>EndIdx也表示oldCh或vCh其中一个遍历结束
