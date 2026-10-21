---
title: "2026-03-31 处理404方法"
description: "一、SPA 路由 404（Vue/React/Angular） Vue Router 处理 404 React Router 处理 404 二、静态资源 404（图片 / 视..."
date: 2026-03-31
collection: engineering
tags: []
readingTime: 1
wordage: 214
originalUrl: "https://www.jianshu.com/p/b11d3bd06c60"
---
一、SPA 路由 404（Vue/React/Angular）

1.  Vue Router 处理 404
2.  React Router 处理 404

二、静态资源 404（图片 / 视频 / JS/CSS 加载失败）  
资源加载失败时，显示默认占位图 / 提示，避免页面空白或破图。

1.  图片 404 兜底（最常用）
2.  CSS/JS 资源加载失败

三、接口请求 404（Ajax/Fetch/axios）  
接口返回 404 时，捕获错误并提示用户，不崩溃页面。

1.  axios 统一处理 404
2.  fetch 处理 404

四、nginx / 服务器配置 404（部署必备）  
前端打包部署后，刷新页面会出现 404，必须靠服务器配置兜底。

1.  nginx 配置（解决 SPA 刷新 404）
2.  Vite / 本地开发服务器 404

五、原生 HTML / 非 SPA 项目 404  
直接创建404.html，服务器配置访问失败时跳转即可。
