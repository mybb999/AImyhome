---
title: "vue的Element-ui入门"
description: "这玩意说实话跟bootstrap和Mui一个样子，都是即取即用 安装npm i element-ui -S记得安装依赖包npm install 完整引入在 main.js 中..."
date: 2019-02-28
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 83
originalUrl: "https://www.jianshu.com/p/5a6663e67361"
---
这玩意说实话跟bootstrap和Mui一个样子，都是即取即用

安装  
npm i element-ui -S  
记得安装依赖包npm install

完整引入  
在 main.js 中写入以下内容：

```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
