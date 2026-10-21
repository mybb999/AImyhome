---
title: "js比较"
description: "if ('0') alert(\"'0' is true\");if ('0' == false) alert(\"'0' is false\");结果是，两次都 alert 了！那..."
date: 2019-04-08
collection: javascript
tags: []
readingTime: 1
wordage: 154
originalUrl: "https://www.jianshu.com/p/00efce2e46c5"
---
if ('0') alert("'0' is true");  
if ('0' == false) alert("'0' is false");结果是，两次都 alert 了！那么 '0' 到底是 true 还是 false 呢？

答案是：在js做比较的时候，有这样的三条规则：  
如果比较的两者中有boolean，会把 boolean 先转换为对应的 number，即 0 和 1(false是0,1是true)  
如果比较的双方中有一方为number一方为string，会把string转换为数字  
把string直接转换为boolean的时候，空字符串‘’转换为 false，除此外的一切字符串转换为 true
