---
title: "四、node路由"
description: "server.js router.js index.js 以上则是模拟一套路由文件"
date: 2019-03-06
collection: server-db
tags: ["Node.js", "路由"]
readingTime: 1
wordage: 18
originalUrl: "https://www.jianshu.com/p/d23402ad8910"
---
## server.js

```
var http = require("http");
var url = require("url");
 
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
 
    route(pathname);
 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
exports.start = start;
```

## router.js

```
function route(pathname) {
  console.log("About to route a request for " + pathname);
}
 
exports.route = route;
```

## index.js

```
var server = require("./server");
var router = require("./router");
 
server.start(router.route);
```

![](/images/blog/si-node-lu-you/01.png)  

以上则是模拟一套路由文件
