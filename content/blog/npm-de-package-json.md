---
title: "npm的package.json"
description: "devDependencies和dependencies，有什么区别？ 安装方式 我们在通过npm安装插件或库时，有三种方式： npm install packagename..."
date: 2019-05-20
collection: engineering
tags: []
readingTime: 1
wordage: 413
originalUrl: "https://www.jianshu.com/p/54b0b894a5fc"
---
devDependencies和dependencies，有什么区别？

## 安装方式

我们在通过npm安装插件或库时，有三种方式：

npm install packagename：将插件安装到项目，但不写入package.json（不推荐，这样最终需要手动添加）  
npm install packagename --save：将插件安装进项目，并写入package.json的dependencies中  
npm install packagename --save-dev：将插件安装进项目，并写入package.json的devDependencies中  
很明显，--save表示保存到package.json中（默认为dependencies），-dev表示保存在package.json的devDependencies中

## 下载方式

拿到别人的项目时，会有package.json文件说明了项目依赖的插件，这时我们需要将包下载下来。

npm install：默认会安装两种依赖，  
npm install --production：只安装dependencies而不安装devDependencies

## 区别

dev是develop的缩写，即表示开发模式，所以：

devDependencies保存的依赖是只用于开发环境，不用于生产环境；

dependencies保存的依赖用于生产环境。

## 生产环境与开发环境

所谓开发环境，就是指开发阶段，比如webpack，gulp这些工具，都只是在开发阶段需要，一旦项目真正投入使用，便不再依赖这些插件，所以将其安装在devDependencies即可；

生产环境，则表示项目真正投入使用时，此时仍然需要依赖的插件则需要安装在dependencies中，比如vue，vue-router，jQuery这些，dependencies中没有这些插件，项目真实使用时就会出错。
