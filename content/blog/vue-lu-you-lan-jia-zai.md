---
title: "vue路由懒加载"
description: "原先： 懒加载： 实际就是用es6的导入形式实现即用即加载，@代表的是src文件目录下"
date: 2019-03-26
collection: vue
tags: ["Vue", "路由"]
readingTime: 1
wordage: 36
originalUrl: "https://www.jianshu.com/p/125f0d986ad6"
---
原先：

```
import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Citylist from '@/components/Citylist'

Vue.use(Router)

export default new Router({
  // 去除地址栏中#
  mode:"history",

  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/citylist',
      name: 'city',
      component: Citylist
    }
  ]
})
```

懒加载：

```
{ path: '/login', component: () => import('@/views/login/Homepage.vue'), hidden: true }
```

实际就是用es6的导入形式实现即用即加载，@代表的是src文件目录下
