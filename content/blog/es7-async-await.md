---
title: "ES7——async、await"
description: "async,await语法糖async和await是ES7新增的规范，两个规范可以看成一队连体婴，他们要一起出现才有效果await只能在async里使用，不然报错reject..."
date: 2019-03-05
collection: javascript
tags: ["异步"]
readingTime: 1
wordage: 181
originalUrl: "https://www.jianshu.com/p/81aab0193df7"
---
async,await语法糖  
async和await是ES7新增的规范，两个规范可以看成一队连体婴，他们要一起出现才有效果  
await只能在async里使用，不然报错  
reject通过try和catch获得  
正常情况下，await 命令后面是一个 Promise 对象，它也可以跟其他值，如字符串，布尔值，数值以及普通函数。

## 使用方法

```
var stop= function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    var result = await stop(3000);
    console.log('end');
};
start();
```

## try和catch方法

```
var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    try{
      await stop(3000);
    }catch(err){
      console.log(err);
    }
    console.log('end');
};
start();
```

await针对所跟不同表达式的处理方式：

Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。  
非 Promise 对象：直接返回对应的值。

```
async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。

async function helloAsync(){
    return "helloAsync";
  }
  
console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
   console.log(v);         // helloAsync
})
```
