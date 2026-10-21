---
title: "react的跨域问题"
description: "在packge.json加入 \"proxy\": \"http://0.0.2.89:7300\" 例如你原本地址是localhost:8000端口，将会映射到上面的那个proxy..."
date: 2019-07-22
collection: react
tags: ["React", "跨域"]
readingTime: 1
wordage: 119
originalUrl: "https://www.jianshu.com/p/18b74a46dad2"
---
在packge.json加入

"proxy": "http://0.0.2.89:7300"

例如你原本地址是localhost:8000端口，将会映射到上面的那个proxy的地址

然后你页面中的请求fetch('/abc/aaa/')就会转发到proxy中的地址

也就是真实的请求是[http://0.0.2.89:7300/abc/userdata/](https://links.jianshu.com/go?to=http%3A%2F%2F0.0.2.89%3A7300%2Fabc%2Fuserdata%2F)，而且也不会有跨域问题

因为在浏览器看来，你只是发了fetch('/abc/aaa/')，没有跨域问题
