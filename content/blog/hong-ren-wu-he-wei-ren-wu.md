---
title: "2021-03-09 宏任务和微任务"
description: "执行顺序：0、2、4、3、1先执行外层宏任务，再执行微任务，然后执行内层宏任务"
date: 2021-03-11
collection: javascript
tags: ["异步"]
readingTime: 1
wordage: 39
originalUrl: "https://www.jianshu.com/p/0e5f81dff5e8"
---
```
console.log(0)
setTimeout(function() {
  console.log(1);
}, 0);
 
new Promise(function (resolve, reject) {
  console.log(2);
  resolve(3);
}).then(console.log);
 
console.log(4);
```

执行顺序：0、2、4、3、1  
先执行外层宏任务，再执行微任务，然后执行内层宏任务
