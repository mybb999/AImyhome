---
title: "react里的index.js是怎么跟index.html结合起来的?"
description: "create-react-app 把webpack、babel等配置都封装到了依赖项目react-script中，所以你无法直观的看到这些配置。你可以在项目下运行npm ru..."
date: 2019-07-04
collection: react
tags: ["React"]
readingTime: 1
wordage: 147
originalUrl: "https://www.jianshu.com/p/71fc61b35047"
---
![](/images/blog/react-li-de-index-js-shi-zen-me-gen-index-html-jie-he-qi-lai-de/01.png)

create-react-app 把webpack、babel等配置都封装到了依赖项目react-script中，所以你无法直观的看到这些配置。你可以在项目下运行npm run eject，被隐藏的配置文件就会暴露到项目根路径下。把请求转发到index.html原因是，你执行npm run start时，启动的webpack-dev-server，会加载react-script项目config文件夹下的配置（paths.js）,里面定义了请求的默认转发路径是public文件夹，自然就找到了public下的index.html。
