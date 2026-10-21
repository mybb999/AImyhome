---
title: "2019-10-11 获取当前this元素"
description: "在HTML元素处写法如下:<OverflowMenuItemitemText={locale.modify}onClick={(e) = this.expand(e)}/..."
date: 2019-10-11
collection: react
tags: []
readingTime: 1
wordage: 35
originalUrl: "https://www.jianshu.com/p/04b303c6c2e6"
---
在HTML元素处写法如下:  
<OverflowMenuItem  
itemText={locale.modify}  
onClick={(e) => this.expand(e)}  
/>

方法：  
expand = (e) => {  
console.log(e);  
}
