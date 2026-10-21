---
title: "移动端适配以及PC和移动端兼容"
description: "一、响应式布局 bootstrap的媒体查询@media和网格系统，一般用来兼容PC和移动端 二、自适应布局+弹性布局 rem+viewport+@media媒体查询，一般用..."
date: 2019-03-01
collection: css-mobile
tags: ["移动端"]
readingTime: 1
wordage: 157
originalUrl: "https://www.jianshu.com/p/7e4744d5cc81"
---
## 一、响应式布局

bootstrap的媒体查询@media和网格系统，一般用来兼容PC和移动端

## 二、自适应布局+弹性布局

rem+viewport+@media媒体查询，一般用来兼容移动端，避免PC端

em是根据上一级元素放大，并且继承  
rem是根据html根元素定位放大，大多数浏览器字体默认1rem=16px,谷歌默认12px（工头教我的）

一般设置html:100px方便计算

通用方法：  
1.html根元素的font-size=100px  
2.设计稿换算，设计稿px/100获得rem值
