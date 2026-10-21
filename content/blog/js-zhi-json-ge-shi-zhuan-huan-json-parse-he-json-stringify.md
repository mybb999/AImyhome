---
title: "JS之JSON格式转换，json.parse和json.stringify"
description: "我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。 我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换..."
date: 2019-03-05
collection: javascript
tags: []
readingTime: 1
wordage: 41
originalUrl: "https://www.jianshu.com/p/5309e7bc0012"
---
我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。

```
var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');
```

我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。

```
var obj = { "name":"runoob", "alexa":10000, "site":"www.runoob.com"};
var myJSON = JSON.stringify(obj);
document.getElementById("demo").innerHTML = myJSON;
```
