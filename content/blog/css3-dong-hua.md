---
title: "css3动画"
description: "css3动画"
date: 2019-03-01
collection: css-mobile
tags: []
readingTime: 1
wordage: 481
originalUrl: "https://www.jianshu.com/p/e3c1deadad1d"
---
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style> 
div
{
    width:100px;
    height:100px;
    background:red;
    animation:myfirst 5s;
    -webkit-animation:myfirst 5s; /* Safari and Chrome，应用myfirst动画5秒内完成 */
}

@keyframes myfirst
{
    from {background:red;}//从红色开始
    to {background:yellow;}//结束于黄色
}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
    from {background:red;}
    to {background:yellow;}
}
</style>
</head>
<body>

<p><b>注意:</b> 该实例在 Internet Explorer 9 及更早 IE 版本是无效的。</p>

<div></div>

</body>
</html>
```
