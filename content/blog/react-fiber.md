---
title: "2023-02-21 React Fiber"
description: "省流：首先，React Fiber并没有解决更新庞大组件树耗时长的问题，实际上总的耗时还是一样的长。但是它解决了一个被广大开发者口诛笔伐的恶行：长时间霸占主线程不放。 它的工..."
date: 2023-02-21
collection: react
tags: ["React"]
readingTime: 1
wordage: 471
originalUrl: "https://www.jianshu.com/p/6c7cbb82e242"
---
省流：  
首先，React Fiber并没有解决更新庞大组件树耗时长的问题，实际上总的耗时还是一样的长。但是它解决了一个被广大开发者口诛笔伐的恶行：长时间霸占主线程不放。

它的工作原理是这样的：把耗时长的更新任务拆解成一个个小的任务分片，每执行完一个小的任务分片，都归还一次主线程，看看有没有什么其他紧急任务要做。如果在归还主线程时恰巧发现有紧急任务，那么会马上停掉当前更新任务，转而让主线程去做紧急任务，等主线程做完紧急任务，再重新做更新任务。（注意：是重新！不是从上次被打断的点继续）；如果没有紧急任务，才敢继续做接下来的任务分片。

React Fiber实现的难点有两个：暂停/重启如何实现？任务如何分散执行？

对于前者，暂停/重启意味着我们需要保存状态，这里在实现上用到了具有链表和指针的“单链表树遍历算法”，能够记录遍历过程中的上一步和下一步。

而对于后者，则用到了requestAnimationFrame和requestIdelCallback这两个API，其中requestAnimationFrame是浏览器在每一帧都一定会执行的，可以放一些高优先级的任务；而requestIdelCallback则是浏览器在一帧中最后如果有空闲时间才会去执行，可以放一些低优先级的任务，需要polyfill（因为兼容性不佳）。  
部分引用：[https://www.jb51.net/article/210296.htm](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.jb51.net%2Farticle%2F210296.htm)
