---
title: "javascript截取方法"
description: "长度光标在右，下边位置光标在左1.slice允许接收负值，处理数组arrayObject.slice(start,end)//起始位置和终结位置 2.substr允许接收负值..."
date: 2019-02-26
collection: javascript
tags: []
readingTime: 1
wordage: 240
originalUrl: "https://www.jianshu.com/p/f9a4524acbf9"
---
长度光标在右，下边位置光标在左  
1.slice  
允许接收负值，处理数组  
arrayObject.slice(start,end)//起始位置和终结位置

2.substr  
允许接收负值，处理字符串  
stringObject.substr(start,length)//起始位置和截取长度

3.substring  
不允许接收负值，处理字符串  
stringObject.substring(start,stop)//起始位置和终结位置

4.split  
处理字符串，分割成数组  
stringObject.split(separator,howmany)//从参数指定地方切割和截取长度

5.join  
处理数组，放入一个字符串  
arrayObject.join(separator)

```
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr.join("."))
```

输出：George.John.Thomas

6.splice  
splice() 从数组中添加/删除项目，然后返回被删除的项目。  
arrayObject.splice(index,howmany,item1,.....,itemX)  
第一个参数index 必需，为要添加到的数组下标，  
第二个参数howmany 必需，为要删除的个数（不删除则为0），  
第三位起 可选，item1,.....,itemX 为要添加的项目。

```
let arr3 = [0]
arr3.splice(1,0,1,2,3)  //[]
arr3  //[0,1,2,3]
```
