---
title: "2021-05-18 关于获取错误头像和匿名名称，原因是wx.getUserProfile替换wx.getUserInfo"
description: "从4月31日起，wx.getUserProfile(Object object)将替换wx.getUserInfo(Object object)微信接口，而且该接口必须点击产..."
date: 2021-05-18
collection: css-mobile
tags: []
readingTime: 1
wordage: 48
originalUrl: "https://www.jianshu.com/p/e2435c42f4c8"
---
![](/images/blog/guan-yu-huo-qu-cuo-wu-tou-xiang-he-ni-ming-ming-cheng-yuan-yin-shi/01.png)  

![](/images/blog/guan-yu-huo-qu-cuo-wu-tou-xiang-he-ni-ming-ming-cheng-yuan-yin-shi/02.png)  

从4月31日起，wx.getUserProfile(Object object)将替换wx.getUserInfo(Object object)微信接口，而且该接口必须点击产生事件后才能生效，算是一个大坑
