---
title: "JS遍历对象"
description: "1.forEach 2.for in"
date: 2019-08-12
collection: javascript
tags: []
readingTime: 1
wordage: 5
originalUrl: "https://www.jianshu.com/p/9c29206508e7"
---
1.forEach

```
var obj = {'0':'a','1':'b','2':'c'};

Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);

});
```

2.for in

```
var obj = {'0':'a','1':'b','2':'c'};

for(var i in obj) {

     console.log(i,":",obj[i]);

}
```
