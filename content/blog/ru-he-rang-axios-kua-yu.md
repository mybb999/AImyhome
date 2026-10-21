---
title: "如何让axios跨域"
description: "在研究react跨域的时候，在开发者模式上可以使用proxy添加到packjson里面但在打包build的时候将失效，先放上一种可以使用的方法，后续添加其他方法 在你的axi..."
date: 2019-08-19
collection: browser-network
tags: ["跨域"]
readingTime: 1
wordage: 85
originalUrl: "https://www.jianshu.com/p/afeb88475313"
---
在研究react跨域的时候，在开发者模式上可以使用proxy添加到packjson里面  
但在打包build的时候将失效，先放上一种可以使用的方法，后续添加其他方法

```
headers: {  
        // 跨域请求 这个配置不能少  
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",  
        'Accept': 'application/json'  
    }  
});
```

在你的axios配置里添加这个，贴上自己一小段实验的代码

  

![](/images/blog/ru-he-rang-axios-kua-yu/01.png)
