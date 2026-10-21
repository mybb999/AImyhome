---
title: "js的ajax"
description: "说实话我很讨厌这复杂的写法 终上所述，用起来很麻烦，这时我们需要封装起来应对多个ajax，以下是我自己花了点时间封装的原生ajax，有点类似模仿Jquery的ajax吧，少了..."
date: 2019-02-27
collection: browser-network
tags: []
readingTime: 1
wordage: 94
originalUrl: "https://www.jianshu.com/p/dbc28945e8f8"
---
说实话我很讨厌这复杂的写法

  

![](/images/blog/js-de-ajax/01.png)

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
function loadXMLDoc()
{
    var xmlhttp;
    if (window.XMLHttpRequest)//检测是否支持XMLHttpRequest
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();//创建函数XMLHttpRequest()
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()//存储函数
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)//判断状态值
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);//连接方法，还有个post，是否异步
    xmlhttp.send();
}
</script>
</head>
<body>

<div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
<button type="button" onclick="loadXMLDoc()">修改内容</button>

</body>
</html>
```

终上所述，用起来很麻烦，这时我们需要封装起来应对多个ajax，以下是我自己花了点时间封装的原生ajax，有点类似模仿Jquery的ajax吧，少了一个success属性，若有问题请提出来，JS仍不够成熟。

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
function ajaxInit(url,fun)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            fun(xmlhttp.responseText)
                        
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
    function ajax(){
        ajaxInit("/try/ajax/ajax_info.txt",function(data){
            document.getElementById("myDiv").innerHTML=data;
        })
    }
    
</script>
</head>
<body>

<div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
<button type="button" onclick="ajax()">修改内容</button>

</body>
</html>
```
