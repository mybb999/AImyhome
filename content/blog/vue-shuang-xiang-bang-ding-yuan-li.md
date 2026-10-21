---
title: "vue双向绑定原理"
description: "实际就是用了Js的Object.defineProperty( )，里面有个get和set方法，面试中问到过，但实际上不写框架脚本真的会用得上吗？"
date: 2019-02-26
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 46
originalUrl: "https://www.jianshu.com/p/0eb75c207181"
---
实际就是用了Js的Object.defineProperty( )，里面有个get和set方法，面试中问到过，但实际上不写框架脚本真的会用得上吗？

```
var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
 
Book.name = 'vue傻子';  // 你取了一个名叫做傻子
console.log(Book.name);  // 《vue傻子》
```
