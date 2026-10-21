---
title: "js继承再度理解"
description: "https://www.cnblogs.com/xiaohuochai/p/5721552.html 函数有原型，函数有一个属性叫prototype，函数的这个原型指向一个对..."
date: 2019-03-26
collection: javascript
tags: []
readingTime: 1
wordage: 187
originalUrl: "https://www.jianshu.com/p/f6d3add9a988"
---
[https://www.cnblogs.com/xiaohuochai/p/5721552.html](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fxiaohuochai%2Fp%2F5721552.html)

函数有原型，函数有一个属性叫prototype，函数的这个原型指向一个对象，这个对象叫原型对象。这个原型对象有一个constructor属性，指向这个函数本身。  
实际上，任何对象都可以看做是通过Object()构造函数的new操作实例化的对象。  
例如：

```
function Foo(){};
var f1 = new Foo;
Foo.prototype//即是一个原型对象，同时也是一个实例对象。
f1.prototype//不存在原型对象，因为它本身即是一个实例对象,而prototype只存在于构造函数中。
f1.__proto__===Foo.prototype//__proto__指向该实例对象的原型对象。
Foo.prototype.__proto__===object.prototype//指向object.prototype，可以想象成f1.__proto__。
Foo.__proto__ === Function.prototype//如果把函数Foo当成实例对象的话，其构造函数是Function()，其原型对象是Function.prototype
Object.__proto__ === Function.prototype//函数Object的构造函数也是Function()，其原型对象是Function.prototype
```

所有的函数都可以看成是构造函数Function()的new操作的实例化对象。那么，Function可以看成是调用其自身的new操作的实例化的结果  
所以，如果Function作为实例对象，其构造函数是Function，其原型对象是Function.prototype

```
console.log(Function.__proto__ === Function.prototype);//true
console.log(Function.prototype.constructor === Function);//true
console.log(Function.prototype === Function.prototype);//true
```
