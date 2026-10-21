---
title: "浏览器兼容问题"
description: "市场上浏览器种类很多，不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。浏览器内核主要分为两种，一是渲染引擎，另一个是js 引擎，内核更加倾向于说渲染引擎..."
date: 2019-04-23
collection: browser-network
tags: []
readingTime: 2
wordage: 621
originalUrl: "https://www.jianshu.com/p/235be707a07d"
---
市场上浏览器种类很多，不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。  
浏览器内核主要分为两种，一是渲染引擎，另一个是js 引擎，内核更加倾向于说渲染引擎。  
常见的浏览器内核：  
常见的浏览器内核可以分四种：Trident、Gecko、Blink、Webkit  
IE浏览器 Trident内核，也成为IE内核  
Chrome浏览器 Webkit内核，现在是Blink内核  
Firefox浏览器 Gecko内核，俗称Firefox内核  
Safari浏览器 Webkit内核  
Opera浏览器 最初是自己的Presto内核，后来加入谷歌大军，从Webkit又到了Blink内核；  
360浏览器 IE+Chrome双内核  
猎豹浏览器 IE+Chrome双内核  
百度浏览器 IE内核  
QQ浏览器 Trident（兼容模式）+Webkit（高速模式）  
常见的兼容性问题：  
1、不同浏览器的标签默认的外补丁( margin )和内补丁(padding)不同  
解决方案： css 里增加通配符 \* { margin: 0; padding: 0; }

2、IE6双边距问题；在 IE6中设置了float , 同时又设置margin , 就会出现边距问题  
解决方案：设置display:inline;

3、当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度  
解决方案：超出高度的标签设置overflow:hidden,或者设置line-height的值小于你的设置高度

4、图片默认有间距  
解决方案：使用float 为img 布局

5、IE9一下浏览器不能使用opacity  
解决方案：  
opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);

6、边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值；  
解决方案：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为overflow:hidden；

7、cursor:hand 显示手型在safari 上不支持  
解决方案：统一使用 cursor:pointer

8、两个块级元素，父元素设置了overflow:auto；子元素设置了position:relative ;且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；  
解决方案：父级元素设置position:relative
