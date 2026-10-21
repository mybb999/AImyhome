---
title: "js闭包"
description: "说实话就是获取函数内部的变量值"
date: 2019-02-27
collection: javascript
tags: ["闭包"]
readingTime: 1
wordage: 15
originalUrl: "https://www.jianshu.com/p/7948c5d7f00b"
---
```
<p>局部变量计数。</p>
<button type="button" onclick="myFunction()">计数!</button>
<p id="demo">0</p>
<script>
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
function myFunction(){
    document.getElementById("demo").innerHTML = add();
}
</script>
```

说实话就是获取函数内部的变量值
