---
title: "requireJS"
description: "requireJS实际就是一个防止JS堵塞浏览器加载的框架，而它的规范是AMD，require时候就要声明所有依赖模块；另一种CMD不太了解，应该是只有用到哪个模块采取req..."
date: 2018-08-29
collection: javascript
tags: []
readingTime: 1
wordage: 203
originalUrl: "https://www.jianshu.com/p/e812ec9b8606"
---
requireJS实际就是一个防止JS堵塞浏览器加载的框架，而它的规范是AMD，require时候就要声明所有依赖模块；另一种CMD不太了解，应该是只有用到哪个模块采取require声明一下(虽然没用过~~~)，各有各的好处吧。但后面又开始了ES6的module方法例如import和export代替AMD，但还是了解一下这个requireJS框架。

#### 1.一般请求JS方法：

```
//我是index.html
<head>
        <script type="text/javascript" src="a.js"></script>
 </head>
```

用了requireJS后：

```
//我是index.html
<head>
        <script type="text/javascript" src="require.js"></script>
        <script type="text/javascript">
            require(["a"]);//请求a.js
        </script>
</head>

//我是a.js
define(function(){
    function fun(){
      alert("胡仔");
    }
    fun();
})
```

#### 2.配置项:

```
require.config({
    paths : {//可以配多个加载路径
        "jquery" : ["http://miao/js/jquery", "js/jquery"],//定义请求的JS文件名等于jquery名字
        "a" : "js/a"   //本地js文件夹的a.js等于a名字
    }
})
require(["jquery","a"],function($){//这就骚了，第一个参数加载全部js，第二个参数执行成功后回调,$是依赖模块的输出变量
    $(function(){
        alert("完成！");  
    })
})
```

![输出参数觉得不够用还可加进去，例如function(](https://math.jianshu.com/math?formula=%E8%BE%93%E5%87%BA%E5%8F%82%E6%95%B0%E8%A7%89%E5%BE%97%E4%B8%8D%E5%A4%9F%E7%94%A8%E8%BF%98%E5%8F%AF%E5%8A%A0%E8%BF%9B%E5%8E%BB%EF%BC%8C%E4%BE%8B%E5%A6%82function\(),\_)

#### 3.全局配置项

若要全部页面都应用同一个配置项  
创建index.js

```
require.config({
    paths : {//可以配多个加载路径
        "jquery" : ["http://miao/js/jquery", "js/jquery"],//定义请求的JS文件名等于jquery名字
        "a" : "js/a"   //本地js文件夹的a.js等于a名字
    }
})
```

页面内容

```
<script data-main="js/index" src="js/require.js"></script>
```

#### 4.其他模块

不符合AMD规范的另一种写法，以下是对underscore类库和插件chajian.js的配置

```
require.config({
    shim: {
        "underscore" : {
            exports : "_";
        },
        "chajianName" : {
            deps : ["chajian"]
        }
    }
})
```

完成后

```
require.config(["underscore", "chajianName"], function($){
    $(function(){
        .........
    })
})
```
