---
title: "2020-01-20 中间层代码小例子之一： express框架+npm request/node.js的http模块"
description: "2020-01-20 中间层代码小例子之一： express框架+npm request/node.js的http模块"
date: 2020-01-20
collection: server-db
tags: ["Node.js"]
readingTime: 3
wordage: 1160
originalUrl: "https://www.jianshu.com/p/c5a66c8f25d7"
---
```
var http = require('http');
var express = require('express');
var app = express();
 
// 方案一：使用http模块
// app.get('/', function (req, res) {

//    console.log("hello express add");
//     var options = {
//         host:'api.github.com',       
//         path:'/users/octocat/gists',
//         method:'get'
//     }
//     var requestServer = http.request(options,function(reqSer,resSer){
//         console.log('STATUS: ' + reqSer.statusCode); 
//         console.log('HEADERS: ' + JSON.stringify(reqSer.headers)); 
//         reqSer.setEncoding('utf8'); 
//         reqSer.on('data', function (chunk) { 
//             console.log('BODY: ' + chunk); 
//             res.writeHead(200, {"Content-Type": "text/plain"});  
//             res.write(chunk);
//             res.end();  
//         }); 
//     });
//     requestServer.on('error', function (e) { 
//         console.log('problem with request: ' + e.message); 
//     });
//     requestServer.end();

// })

// 方案二：使用npm request类
var request = require('request');

app.get('/', function(req, res, next) { 
    request({
        'https://api.github.com/users/octocat/gists'
    },function(error,response,body){
        console.log(body);
        /*判断请求是否成功*/
        if(!error&&response.statusCode == 200){
            /*把字符串转换为json*/
            var data=JSON.parse(body);
            /*渲染模板*/
            res.send(data);
        }
    });
});

 
var server = app.listen(8081, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port) 
})
```
