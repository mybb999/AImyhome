---
title: "js对象obj中的[]"
description: "obj是一个对象，obj[arr[i]]获得该对象的Key键值，上述则是判断该key键值是否有值"
date: 2019-03-05
collection: javascript
tags: []
readingTime: 1
wordage: 34
originalUrl: "https://www.jianshu.com/p/47791e3b3275"
---
```
var arr = [0,2,3,4,4,0,2];
var obj = {};
var tmp = [];
for(var i = 0 ;i< arr.length;i++){
   if( !obj[arr[i]] ){
      obj[arr[i]] = 1;
      tmp.push(arr[i]);
   }
}
console.log(tmp);
```

obj是一个对象，obj\[arr\[i\]\]获得该对象的Key键值，上述则是判断该key键值是否有值
