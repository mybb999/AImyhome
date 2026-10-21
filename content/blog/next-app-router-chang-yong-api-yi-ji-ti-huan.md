---
title: "2026-08-17 Next App Router常用API以及替换"
description: "getStaticPaths、getStaticProps、getServerSideProps、getInitialProps，这四个是 Pages Router 专属，A..."
date: 2026-08-17
collection: react
tags: ["Next.js"]
readingTime: 1
wordage: 184
originalUrl: "https://www.jianshu.com/p/35062e4c166b"
---
getStaticPaths、getStaticProps、getServerSideProps、getInitialProps，这四个是 Pages Router 专属，App Router 已经废弃这一套，不再使用。  
只运行在服务端，不能在组件内部调用，只能写在页面文件导出函数

![](/images/blog/next-app-router-chang-yong-api-yi-ji-ti-huan/01.png)

只能在pages/下面页面文件导出，组件文件写了无效  
不能用 react hooks，这里不是组件，是 node 层函数，可以直接数据库、请求后端接口  
App Router 完全移除这 4 个 API！  
App Router 替代方案：  
SSG：服务端组件直接 await fetch，默认静态  
ISR：fetch(url, {next:{revalidate:60\}\})  
SSR：fetch(url, {cache:'no-store'})  
动态路由参数直接从 page 入参拿async Page({params,searchParams})
