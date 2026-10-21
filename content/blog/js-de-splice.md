---
title: "JS的splice"
description: "splice() 从数组中添加/删除项目，然后返回被删除的项目。 添加项目： arrayObject.splice(index,howmany,item1,.....,ite..."
date: 2019-04-01
collection: javascript
tags: []
readingTime: 1
wordage: 134
originalUrl: "https://www.jianshu.com/p/9a9f451a0291"
---
splice() 从数组中添加/删除项目，然后返回被删除的项目。

添加项目：

arrayObject.splice(index,howmany,item1,.....,itemX)  
第一个参数index 必需，为要添加到的数组下标，  
第二个参数howmany 必需，为要删除的个数（不删除则为0），  
第三位起 可选，item1,.....,itemX 为要添加的项目。

```
let arr3 = [0]
arr3.splice(1,0,1,2,3)  //[]
arr3  //[0,1,2,3]
```

顺便 删除元素(接着上面操作)：

```
arr3.splice(1,2)  //[1,2]
arr3  //[0,3]
```

两者可以合并使用，在删除的位置上添加项目(接着上面操作)。

```
arr3.splice(1,1,9,9,9)  //[3]
arr3  //[0,9,9,9]
```
