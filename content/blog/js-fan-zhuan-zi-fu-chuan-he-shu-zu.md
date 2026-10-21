---
title: "js反转字符串和数组"
description: "arrayObject.reverse()反转数组 反转字符串"
date: 2019-02-27
collection: javascript
tags: []
readingTime: 1
wordage: 11
originalUrl: "https://www.jianshu.com/p/16cc18c207b7"
---
arrayObject.reverse()  
反转数组

```
<script type="text/javascript">

var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr + "<br />")
document.write(arr.reverse())

</script>
//George,John,Thomas
//Thomas,John,George
```

反转字符串

```
var str = "abcdef"; 
console.log( str.split("").reverse().join("") )；
```
