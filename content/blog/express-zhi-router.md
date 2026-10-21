---
title: "express之router"
description: "请求另一个后端的数据， request发起下请求就行了"
date: 2019-04-24
collection: server-db
tags: ["Node.js"]
readingTime: 1
wordage: 20
originalUrl: "https://www.jianshu.com/p/60948714cd09"
---
请求另一个后端的数据， request发起下请求就行了

```
var request = require("request");
router.get('/case',function(req,res,next){
    request({url: '...'}, (err,responce,body) => {
        res.render('cases', {
            'navname': 'cases',
            'navs':navs,
            'host':host，
            'data': body  //取数据
        });
    })
    
});
```
