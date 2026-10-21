---
title: "js的event.stopPropagation()和event.preventDefault()"
description: "event.stopPropagation()终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他..."
date: 2019-02-27
collection: javascript
tags: []
readingTime: 1
wordage: 176
originalUrl: "https://www.jianshu.com/p/02cd277f737b"
---
event.stopPropagation()  
终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。  
说实话，就是防止冒泡，防止底下一层影响上一层

event.preventDefault()  
例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。  
如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。
