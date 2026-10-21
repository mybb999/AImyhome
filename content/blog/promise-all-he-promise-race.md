---
title: "2020-05-11 Promise.all和Promise.race"
description: "转载：https://www.jianshu.com/p/7e60fc1be1b2[https://www.jianshu.com/p/7e60fc1be1b2]一、Pomi..."
date: 2020-05-11
collection: javascript
tags: ["异步"]
readingTime: 1
wordage: 476
originalUrl: "https://www.jianshu.com/p/3f0eca173e70"
---
转载：[https://www.jianshu.com/p/7e60fc1be1b2](https://www.jianshu.com/p/7e60fc1be1b2)  
一、Pomise.all的使用  
Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。  
具体代码如下：

```
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promse.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})

Promise.all([p1,p3,p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)      // 失败了，打出 '失败'
})
```

Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。

代码模拟：

```
let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})
```

需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

二、Promise.race的使用  
顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race(\[p1, p2, p3\])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

```
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```

\---------补充----------  
如果错误了仍要继续执行下一个函数操作呢？  
首先我们需要知道Promise的状态具有可传递性，其次catch方法在执行后也会返回一个状态为resolved的新Promise实例，所以我们只要将可能reject的Promise实例先catch一遍就可以了，就像做一次状态预加工：

```
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(2);
    }, 1000);
});

var promiseArr = [p1, p2];
var promiseArr_ = promiseArr.map(function (promiseItem) {
    return promiseItem.catch(function (err) {
        return err;
    })
});

Promise.all(promiseArr_)
    .then((resp) => {
        console.log(resp);//[1,2]
    }).catch((err) => {
        console.log(err);
    });
```
