---
title: "js继承-----prototype、__proto__、constructor（该文章有错误，仅供自己做例子用）"
description: "1.每一个方法都有一个prototype原型对象属性，主要用来继承，a.prototype===temp是因为它是由temp所new出来的构造函数 2.proto每一个对象都..."
date: 2019-02-27
collection: javascript
tags: ["原型"]
readingTime: 1
wordage: 201
originalUrl: "https://www.jianshu.com/p/cb4d599bab34"
---
```
function a(){};
var temp = new a();
console.log(a.prototype === temp);//true
console.log(a.prototype.__proto__===Object.prototype); //true
console.log(a.__proto__===Function.prototype); //true
```

1.每一个方法都有一个prototype原型对象属性，主要用来继承，a.prototype===temp是因为它是由temp所new出来的构造函数

2.**proto**每一个对象都拥有，并且指向构造它的函数，例如a.prototype.**proto**\===Object.prototype

3.constructor 属性返回对创建此对象的函数对象的引用。  
请看以下例子:

```
function a(){};
console.log(a.constructor===Function); //true
console.log(a.prototype.constructor===a); //true
```

函数a是由Function创造出来,那么它的constructor指向的Function,a.prototype是由new a()方式创造出来,那么a.prototype.constructor理应指向a

继承：  
typeof:检测该类型  
instannceof:instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置

```
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
//原型链继承
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//　Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true
```

还有一个构造继承

```
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```
