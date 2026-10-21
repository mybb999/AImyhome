---
title: "object.defineProperty"
description: "Object.defineProperty()语法说明Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性 ob..."
date: 2019-04-24
collection: javascript
tags: []
readingTime: 1
wordage: 233
originalUrl: "https://www.jianshu.com/p/c0fae0706db2"
---
Object.defineProperty()语法说明  
Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性

```
Object.defineProperty(obj, prop, desc)
```

obj 需要定义属性的当前对象  
prop 当前需要定义的属性名  
desc 属性描述符  
一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，但是通过Object.defineProperty()定义属性，通过描述符的设置可以进行更精准的控制对象属性。

get：一个给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined。  
set：一个给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为undefined。

```
let Person = {}
let temp = null
Object.defineProperty(Person, 'name', {
  get: function () {
    return temp
  },
  set: function (val) {
    temp = val
  }
})
```

![](/images/blog/object-defineproperty/01.png)
