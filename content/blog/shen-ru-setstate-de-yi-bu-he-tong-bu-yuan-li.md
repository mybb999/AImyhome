---
title: "深入setState的异步和同步原理"
description: "在 React 中，如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 会同步更新 this.state，除此之外的 s..."
date: 2019-09-30
collection: react
tags: []
readingTime: 1
wordage: 433
originalUrl: "https://www.jianshu.com/p/f49900f9466a"
---
在 React 中，如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 会同步更新 this.state，除此之外的 setState 调用不会同步执行 this.state。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用。

原因：在 React 的 setState 函数实现中，会根据一个变量isBatchingUpdates判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为t rue，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

在React的setState函数实现中，会根据一个变量 isBatchingUpdate 来判断是直接同步更新this.state还是放到队列中异步更新 。React使用了事务的机制，React的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用batchedUpdates方法修改isBatchingUpdates变量为true，在后置钩子中将变量置为false。原生绑定事件和setTimeout异步的函数没有进入到React的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的setState会直接进入非批量更新模式，表现在我们看来成为了同步SetState
