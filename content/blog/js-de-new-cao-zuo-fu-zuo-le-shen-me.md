---
title: "2026-03-31 js的new操作符做了什么"
description: "离职了后加深印象和复习一下知识引用地址："
date: 2026-03-31
collection: javascript
tags: []
readingTime: 1
wordage: 20
originalUrl: "https://www.jianshu.com/p/be61f7b8ad5c"
---
离职了后加深印象和复习一下知识  
引用地址：

```
https://zhangqi.blog.csdn.net/article/details/156514248
```

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}
 
Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
};
 
const person = new Person('Alice', 25);
 
// 等价于：
// 1. const obj = {};
// 2. obj.__proto__ = Person.prototype;
// 3. Person.call(obj, 'Alice', 25);
// 4. return obj;
```

```
function myNew(constructor, ...args) {
    // 1. 创建新对象，并链接原型
    const obj = Object.create(constructor.prototype);
    
    // 2. 执行构造函数，绑定 this
    const result = constructor.apply(obj, args);
    
    // 3. 判断返回值
    return result instanceof Object ? result : obj;
}
```

```
function Dog(name, breed) {
    this.name = name;
    this.breed = breed;
}
 
Dog.prototype.bark = function() {
    console.log(`${this.name} says: Woof!`);
};
 
const dog1 = myNew(Dog, 'Buddy', 'Golden Retriever');
dog1.bark(); // Buddy says: Woof!
console.log(dog1 instanceof Dog); // true
```
