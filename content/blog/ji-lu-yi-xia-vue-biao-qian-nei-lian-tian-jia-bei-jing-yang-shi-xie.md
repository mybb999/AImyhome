---
title: "2020-10-14 记录一下vue标签内联添加背景样式写法"
description: "写法上也用驼峰形式，类似于jsx写法"
date: 2020-10-14
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 16
originalUrl: "https://www.jianshu.com/p/12f97a6a7f02"
---
写法上也用驼峰形式，类似于jsx写法

```
<div class="ban-img img100" :style="{background: 'url(' + require('~/assets/images/yw-ban.jpg') + ') no-repeat center',backgroundSize: 'cover'}">
```
