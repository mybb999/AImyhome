---
title: "左右两端固定，中间自适应"
description: "1.先贴个最难的，圣杯布局三个div先浮动布局，id=\"main\"里面嵌套一层div，设置宽度100%，margin值为左右两端的宽度值。left的div，设置左间距-100..."
date: 2019-03-18
collection: css-mobile
tags: []
readingTime: 1
wordage: 136
originalUrl: "https://www.jianshu.com/p/c9773280d15e"
---
1.先贴个最难的，圣杯布局  
三个div先浮动布局，id="main"里面嵌套一层div，设置宽度100%，margin值为左右两端的宽度值。  
left的div，设置左间距-100%排在main左边；right的div，设置左间距为自身宽度230px，目的排在main最右边

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>layout_box</title>       
    </head>
    <body>
        <div id="main">
          <div id="mainContainer">main content</div>
        </div>
        <div id="left">
          <div id="leftContainer" class="inner">left content</div>
        </div>
        <div id="right">
          <div id="rightContainer" class="inner">right</div>
        </div>
    </body>
</html>
<style type="text/css">
    #main {
     float: left;
     width: 100%;
    }
    #mainContainer {
     margin: 0 230px;
     height: 200px;
     background: green;
    }
    #left {
     float: left;
     margin-left: -100%;
     width: 230px
    } 
    #right {
     float: left;
     margin-left: -230px;
     width: 230px;
    } 
    #left .inner,
    #right .inner {
     background: orange;
     margin: 0 10px;
     height: 200px;
    }

</style>
```

2.自身浮动  
左右两端浮动，中间margin自适应

```
<div style="width:100%; margin:0 auto;"> 

       <div style="width:200px; float:right; background-color:#960">这是右侧的内容 固定宽度</div>

       <div style="width:150px; float:left; background:#6FF">这是左侧的内容 固定宽度</div>

       <div style="margin-left:150px;margin-right:200px; background-color:#9F3">中间内容，自适应宽度</div>

    </div>

```

3.绝对定位布局  
说白了就是左右两端绝对定位，中间用margin自适应

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>layout_box</title>       
    </head>
    <body>
        <div> 
           <div id="left">这是左侧的内容 固定宽度</div>
           <div id="right">这是右侧的内容 固定宽度</div>
           <div id="main">中间内容，自适应宽度</div>
        </div>
    </body>
</html>
<style type="text/css">
    #left,#right{
        position: absolute;top: 0;width: 220px;height: 100%;
    }
    #left{ left: 0;background: yellow; }
    #right{ right: 0;background: red; }
    #main{ margin: 0 230px;height: 100% }

</style>
```
