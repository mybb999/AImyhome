---
title: "js的bind、call、apply改变this指向"
description: "1.bind 利用bind得到多个fn的clone版本 两个方法都是o对象来调用的，在不使用bind改变this指向空间时，两个均为John,但由于bind的特殊作用,将其指..."
date: 2018-12-24
collection: javascript
tags: []
readingTime: 1
wordage: 85
originalUrl: "https://www.jianshu.com/p/5f7326318388"
---
1.bind

```
function fn() {
    console.log(this.length);
}
var newFn = fn.bind([1,2,3,4]);
newFn();//输出4
```

利用bind得到多个fn的clone版本

```
var newFn2 = fn.bind('好吧');
newFn2();//输出2
```

```
var name = 'sally';
 
function sayName(){
    return this.name;
}
function sayName2(){
    return this.name
}
 
var o = {
    'name':'John',
    sayName:sayName,
    sayName2:sayName2.bind(window)
};
console.log(o.sayName()); //John
console.log(o.sayName2());//sally 
```

两个方法都是o对象来调用的，在不使用bind改变this指向空间时，两个均为John,但由于bind的特殊作用,将其指向绑定为window的，因为最后一个输出了全局变量的name;

2.call和apply

```
var name = 'sally';
function sayName(){
    return this.name;
}
var o = {
    'name':'John',
    sayName:sayName
};
sayName();//指向window
sayName.call(o);//指向当前this
//sayName.apply(o);
```
