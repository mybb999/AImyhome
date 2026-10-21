---
title: "vue生命周期"
description: "最近面试很多人问这个要求全部解释出来，不知道是不是特别严格只答了creat、mounted、update、destory没加ed然后就GG了，但一般来说我习惯根据索引去找对应..."
date: 2019-02-27
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 251
originalUrl: "https://www.jianshu.com/p/88d1e1a26850"
---
最近面试很多人问这个要求全部解释出来，不知道是不是特别严格只答了creat、mounted、update、destory没加ed然后就GG了，但一般来说我习惯根据索引去找对应的生命周期，那直接写上简书直接摊开懒得被一个个去问了。

```
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
```

beforecreated：el 和 data 并未初始化  
created:完成了 data 数据的初始化，el没有  
beforeMount：完成了 el 和 data 初始化  
mounted ：完成挂载  
beforeUpdate：更改已完成，但尚未准备好更新DOM  
Update：在DOM中呈现的更改  
beforeDestroy：钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。  
destroyed：钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
