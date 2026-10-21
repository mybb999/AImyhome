---
title: "2024-12-06 宏任务和微任务进阶"
description: "参考例子：https://blog.csdn.net/weixin38647954/article/details/138500637[https://blog.csdn...."
date: 2024-12-06
collection: javascript
tags: ["异步"]
readingTime: 1
wordage: 29
originalUrl: "https://www.jianshu.com/p/78bfbc93917b"
---
参考例子：[https://blog.csdn.net/weixin\_38647954/article/details/138500637](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fweixin_38647954%2Farticle%2Fdetails%2F138500637)  
以下是练习题

```
console.log(1);
setTimeout(function () {
  console.log(2);
  let promise = new Promise(function (resolve, reject) {
    console.log(3);
    resolve();
  }).then(function () {
    console.log(4);
  });
}, 1000);
setTimeout(function () {
  console.log(5);
  let promise = new Promise(function (resolve, reject) {
    console.log(6);
    resolve();
  }).then(function () {
    console.log(7);
  });
}, 0);
let promise = new Promise(function (resolve, reject) {
  console.log(8);
  resolve()
}).then(function () {
  console.log(9);
}).then(function () {
  console.log(10)
});
console.log(11);
//执行顺序：1 8 11 9 10 5 6 7 2 3 4

```
