---
title: "2020-07-21关于node-sass与node版本冲突的问题解决"
description: "将node-sass更新到最新版本 ,如果npm run dev还报错版本冲突,就第二步 转https://www.jianshu.com/p/9cdc24c76588"
date: 2020-07-21
collection: engineering
tags: ["Node.js"]
readingTime: 1
wordage: 34
originalUrl: "https://www.jianshu.com/p/22f2e5470a99"
---
将node-sass更新到最新版本 ,如果npm run dev还报错版本冲突,就第二步

```
cnpm i -D node-sass 
```

```
npm rebuild node-sass
```

转[https://www.jianshu.com/p/9cdc24c76588](https://www.jianshu.com/p/9cdc24c76588)
