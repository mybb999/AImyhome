---
title: "2020-09-15 封装mixin方法，object.create()和new object()区别"
description: "其实就是仿java的interface接口继承 总结区别 Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，new Object()..."
date: 2020-09-16
collection: javascript
tags: []
readingTime: 1
wordage: 130
originalUrl: "https://www.jianshu.com/p/29f8932a2578"
---
其实就是仿java的interface接口继承

```
const mixin = function(obj,mixins){
    const newObj = obj;

    newObj.prototype = Object.create(obj.prototype);

    for(let prop in mixins){
        if(mixins.hasOwnProperty(prop)){
            newObj.prototype[prop] = mixins[prop];
        }
    }

    return newObj;
}

const BigMixin = {
    fly:()=>{
        console.log('I can fly');
    }
};

const Big = function(){
    console.log('new big');
}

const FlyBig = mixin(Big,BigMixin);

const flyBig = new FlyBig();  //=>'new big'
```

总结区别

Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，new Object() 创建的新对象的原型指向的是 Object.prototype. （前者继承指定对象， 后者继承内置对象Object）

可以通过Object.create(null) 创建一个干净的对象，也就是没有原型，而 new Object() 创建的对象是 Object的实例，原型永远指向Object.prototype.
