---
title: "vue的渲染函数render"
description: "重点：createElement、render、vm.$slot createElement接收3个参数：第一个参数可以是HTML标签名，组件或者函数都可以；此参数是必须的；..."
date: 2019-02-28
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 304
originalUrl: "https://www.jianshu.com/p/2a88e9a0d1ab"
---
重点：createElement、render、vm.$slot

createElement接收3个参数：  
第一个参数可以是HTML标签名，组件或者函数都可以；此参数是必须的；

第二个为数据对象（可选）；

第三个为子节点（可选），可以加上字符串试试就知道了，实际就是加个东西进去。

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <blog-post>
  <h1 slot="header">
    About Me
  </h1>

  <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>

  <p slot="footer">
    Copyright 2016 Evan You
  </p>

  <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
</blog-post>
</div>

<script>
// 注册
Vue.component('blog-post', {
  render: function (createElement) {
//用来访问被插槽分发的内容，每个具名插槽有其相应的属性，例如slot="header"的内容将会在vm.$slots.header中找到，vm.$slots实际就是插槽集内容，类似于$refs一样集合。（注意：vm.$slots.default 属性包括了所有没有被包含在具名插槽中的节点，意思就是没丢在插槽集的多余节点。）
    var header = this.$slots.header//获得插槽集里名为header的内容
    var body   = this.$slots.default
    var footer = this.$slots.footer
//下面的div为包含创建三个节点的标签名，第一个header为组件名，第二个header为上面变量值
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
</body>
</html>
```

![](/images/blog/vue-de-xuan-ran-han-shu-render/01.png)

很明显Copyright 2016 Evan You被丢在了最下面顺序，也显示出了创造节点的顺序

这只是一个createElement函数的使用，而Vue2中VNodeData

class: v-bind/:class

style:v-bind/:style

attrs:dom属性，如id

props:props,

on:\[自定义事件\]等，

nativeOn:原生事件

像这些也可以在render函数中实现，若VNode是组件或含有组件的slot，那么VNode必须是唯一。

像平常开发过程中单文件组件中template写法更为简单，可读性也高。如果是webpack进行打包的话template也会预编译成render函数。

真要用得上再说吧，个人懒得去记太多东西，说不定哪天这条属性又被干掉换了更简便的写法。
