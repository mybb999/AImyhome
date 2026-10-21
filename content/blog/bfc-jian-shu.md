---
title: "BFC简述"
description: "什么是BFC 在一个Web页面的CSS渲染中，块级格式化上下文 (Block Fromatting Context)是按照块级盒子布局的。W3C对BFC的定义如下： 为了便于..."
date: 2019-05-28
collection: css-mobile
tags: ["CSS"]
readingTime: 1
wordage: 465
originalUrl: "https://www.jianshu.com/p/77d73feeb5d7"
---
## [什么是BFC](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Flibin-1%2Fp%2F7098468.html)

在一个Web页面的CSS渲染中，[块级格式化上下文](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3.org%2FTR%2FCSS21%2Fvisuren.html%23block-formatting) (Block Fromatting Context)是按照块级盒子布局的。W3C对BFC的定义如下：

```
浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

```

为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：

1、float的值不是none。  
2、position的值不是static或者relative。  
3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex  
4、overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。  
怎么创建BFC  
要显示的创建一个BFC是非常简单的，只要满足上述4个CSS条件之一就行。例如：

```
<div class="container">
  你的内容
</div>
```

在类container中添加类似 overflow: scroll，overflow: hidden，display: flex，float: left，或 display: table 的规则来显示创建BFC。虽然添加上述的任意一条都能创建BFC，但会有一些副作用：

1、display: table 可能引发响应性问题  
2、overflow: scroll 可能产生多余的滚动条  
3、float: left 将把元素移至左侧，并被其他元素环绕  
4、overflow: hidden 将裁切溢出元素

因而无论什么时候需要创建BFC，都要基于自身的需要来考虑。例如overflow: hidden 方式：

.container {  
overflow: hidden;  
}

BFC可以做什么呢？  
1.利用BFC避免外边距折叠，防止垂直 margin 重叠  
2.清除内部浮动

3.  自适应两栏布局
