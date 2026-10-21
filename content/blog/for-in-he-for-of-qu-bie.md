---
title: "2023-03-03 for in和for of区别"
description: "1、for in 和 for of 都可以循环数组，for in 输出的是数组的index下标，而for of 输出的是数组的每一项的值。2、对于普通对象，没有部署原生的 i..."
date: 2023-03-03
collection: javascript
tags: []
readingTime: 1
wordage: 177
originalUrl: "https://www.jianshu.com/p/5767ec66eff6"
---
1、for in 和 for of 都可以循环数组，for in 输出的是数组的index下标，而for of 输出的是数组的每一项的值。  
2、对于普通对象，没有部署原生的 iterator 接口，直接使用 for...of 会报错  
3、for...in 循环不仅遍历数字键名，还会遍历手动添加的其它键，甚至包括原型链上的键。for...of 则不会这样

总之，for...in 循环主要是为了遍历对象而生，不适用于遍历数组

for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象
