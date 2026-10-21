---
title: "js排序"
description: "arrayObject.sort(sortby) 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。若 a 等于 b，则返回 0。若 a..."
date: 2019-02-27
collection: javascript
tags: []
readingTime: 1
wordage: 77
originalUrl: "https://www.jianshu.com/p/e0f441ef7444"
---
arrayObject.sort(sortby)

若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。  
若 a 等于 b，则返回 0。  
若 a 大于 b，则返回一个大于 0 的值。

```
<script type="text/javascript">

function sortNumber(a,b)
{
return a - b
}

var arr = new Array(6)
arr[0] = "10"
arr[1] = "5"
arr[2] = "40"
arr[3] = "25"
arr[4] = "1000"
arr[5] = "1"

document.write(arr + "<br />")
document.write(arr.sort(sortNumber))

</script>
```

10,5,40,25,1000,1  
1,5,10,25,40,1000
