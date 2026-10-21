---
title: "vue搭建"
description: "安装vue-cli脚手架npm install vue-cli -g 创建基于webpack的vue项目文件testvue init webpack test 安装依赖包no..."
date: 2019-02-27
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 218
originalUrl: "https://www.jianshu.com/p/17e5a74484e4"
---
安装vue-cli脚手架  
npm install vue-cli -g

创建基于webpack的vue项目文件test  
vue init webpack test

安装依赖包node\_moudules  
npm install

VUE开发模式，实际就是虚拟跑一下  
npm run dev

VUE打包  
npm run build

额外话  
dist文件是自己打包出来的文件

webpack.base.conf.js，entry节点配置了编译入口，output节点配置了输出，这段entry和output配置的含义是：编译文件，然后输出到文件。

  

![](/images/blog/vue-da-jian/01.png)

package.json ,内置初始插件名称。后期再安装插件，npm i 插件名 --save ，可以保存进文件内，截个自己项目图，也许你会发现我在VUE里用了Jquery，实际上我只是拿他的ajax来使用并未操作dom节点，必要时可以使用![ref(标签上使用)和](https://math.jianshu.com/math?formula=ref\(%E6%A0%87%E7%AD%BE%E4%B8%8A%E4%BD%BF%E7%94%A8\)%E5%92%8C)refs（vue实例方法中使用）  

![](/images/blog/vue-da-jian/02.png)
