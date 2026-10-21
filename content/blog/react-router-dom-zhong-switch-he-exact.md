---
title: "react-router-dom中Switch和exact"
description: "路由地址： 内容： / 根 /user 用户 /user/hh用户笑了 先说exact：(此时没有Switch)，给 / 设置exact精确匹配 地址栏： /user/hh ..."
date: 2019-07-04
collection: react
tags: ["React"]
readingTime: 1
wordage: 160
originalUrl: "https://www.jianshu.com/p/ef201effb518"
---
路由地址：　　 内容：

/　　 　　　　根

/user 　　　　用户

/user/hh　　　用户笑了

先说exact：(此时没有Switch)，给 / 设置exact精确匹配

地址栏： /user/hh

渲染2个组件 :  
　　　　用户  
　　　　用户笑了

再说Switch:(此时没有exact)  
　　地址栏：/user 或者 /user/hh  
　　只渲染1个组件：  
　　　　　　　　根

当既有Switch又有exact时  
　　　　地址栏　　 -> 　　渲染  
　　　　/user 　　 ->　　 用户  
　　　　/user/hh -> 用户 (不会渲染：用户笑了。  
因为Switch匹配一个后就停止匹配，在 / 上加exact后只有当地址栏是 / 时才匹配到)

\------------------------------说明一点  
V4版本不存在IndexRoute  
exact代替IndexRoute
