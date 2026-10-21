---
title: "2021-02-07 递归深拷贝"
description: "使用递归的方式实现深拷贝,直接写在插件上用，稍微补充一下"
date: 2021-02-07
collection: javascript
tags: ["深拷贝"]
readingTime: 1
wordage: 27
originalUrl: "https://www.jianshu.com/p/a042137f48a9"
---
使用递归的方式实现深拷贝,直接写在插件上用，稍微补充一下

```
//使用递归的方式实现数组、对象的深拷贝
function deepClone1(obj) {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone1(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
```
