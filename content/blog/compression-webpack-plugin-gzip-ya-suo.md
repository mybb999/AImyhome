---
title: "compression-webpack-plugin Gzip压缩"
description: "compression-webpack-plugin一款压缩插件，适用于vue-cli版本2以上查看安装vue-cli版本 productionGzip: 设置为true 安..."
date: 2019-07-26
collection: engineering
tags: ["Webpack", "构建优化"]
readingTime: 1
wordage: 92
originalUrl: "https://www.jianshu.com/p/7c375280cc43"
---
`compression-webpack-plugin`一款压缩插件，适用于`vue-cli`版本2以上  
查看安装vue-cli版本

```
vue -V

```

productionGzip: 设置为`true`

```
  // 在设置为 `true`之前, 确保安装了compression-webpack-plugin开发依赖
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

```

安装`compression-webpack-plugin`开发依赖插件

```
npm install --save-dev compression-webpack-plugin

```

注意此时`npm run build`  
会出现报错

```
ValidationError: Compression Plugin Invalid Options
options should NOT have additional properties

```

这是由于版本问题，在项目`package.json`里将

```
 "compression-webpack-plugin": "^2.0.0",

```

降版本

```
"compression-webpack-plugin": "^1.1.11",

```

`npm run build`可得到

![](/images/blog/compression-webpack-plugin-gzip-ya-suo/01.png)

使用仍需要配置后端。
