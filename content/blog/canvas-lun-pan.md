---
title: "canvas轮盘"
description: "以前研究canvas留下的东西，不过毕竟比较少做这方面，开始偏向后台，唯一记得就是不断的restore重绘......"
date: 2019-03-28
collection: javascript
tags: []
readingTime: 1
wordage: 42
originalUrl: "https://www.jianshu.com/p/7a3f54f00f8c"
---
以前研究canvas留下的东西，不过毕竟比较少做这方面，开始偏向后台，唯一记得就是不断的restore重绘......

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>抽奖</title>
    <style>
        .text-center {
            text-align: center;
        }

        .title {
            color: blue;
        }
        .div canvas{
            position: absolute;
            top:0;left:0;
        }
        button{
            width:200px;height:60px;
            color:red;
            font-weight: bold;
            font-size: 30px;
        }
    </style>
</head>
<body class="text-center">
<!--<h2 class="text-center title">抽奖</h2>-->
<div style="width:1200px;height:1200px;margin:50px auto;zoom: 0.5;position: relative;" class="text-center div">
    <!--转盘层的canvas-->
    <canvas id="canvas"></canvas>
    <!--指针所在的canvas-->
    <canvas id="canvas2"></canvas>
</div>
<button onclick="go()">开始抽奖</button>
</body>

<script>
    var colors = ['#33ACB5', '#DF5C5D', '#B4D966', '#5450B3', '#FFD457', '#3A97EA', '#FAA167', '#63CA97', '#9A50B3'];
    //定义人名和对应的颜色
    var data = [
        {name: '胡胡', color: colors[0]},
        {name: 'LUKE', color: colors[1]},
        {name: '雕兄', color: colors[2]},
        {name: '他妹', color: colors[3]},
        {name: '他弟', color: colors[4]},
        {name: 'VUE总', color: colors[5]},
        {name: '二代目工头', color: colors[6]},
        {name: '初代目工头', color: colors[7]},
        {name: '三代目工头', color: colors[8]},
        {name: '痴汉', color: colors[6]},
        {name: '猪头', color: colors[5]}
    ];

    var canvas = document.getElementById('canvas');//转盘所在画布
    var canvas2 = document.getElementById('canvas2'); //指针所在画布
    canvas.width = canvas2.width = 1200;
    canvas.height = canvas2.height = 1200;

    var sector = canvas.getContext("2d"); //每一个区域块
    var hand = canvas2.getContext("2d");  //指针

    var w = canvas.width;
    var h = canvas.height;

    paintName(data);

    //画指针
    hand.fillStyle = "black";
    hand.fillRect(595, 50, 10, 600);
    hand.arc(w/2,h/2,30,0,Math.PI*2);
    hand.fill();

    //绘制转盘
    function paintName(data) {
        var len = data.length;
        var angle = Math.PI * 2 / len;//为每一块分配角度

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            sector.beginPath();
            sector.moveTo(w / 2, h / 2);
            sector.lineTo(w - 3, h / 2);
            sector.arc(w / 2, h / 2, h / 2 - 3, 0, angle);
            // sector.lineTo(w / 2, h / 2);
            sector.fillStyle = item.color;
            sector.fill();
            // sector.stroke();

            //旋转所渲染的块
            sector.translate(600, 600); // 设置原点为画布中心
            sector.rotate(angle);
            sector.translate(-600, -600); // 恢复画布中心到（0，0）

            sector.save();

            //绘制文字
            sector.translate(900, 600);
            sector.font = "50px Georgia";
            sector.fillStyle = "#fff";
            sector.fillText(item.name, -80, -60);
            sector.translate(-1000, -600);//如果不用save和restore把translate里的1000改为900就好
            sector.restore();
        }
    }

    //点击click的时候调用这个方法
    //我这里有定义了加速度a0,他是随机生成的，所以每次点击开始抽奖的时候，转动的加速度是随机的，这保证了抽奖的随机性
    function go() {
        var time = 3000;
        var a0 = (Math.random()+5) / 100;//保证最小固定加速度为0.05
        var clock = 20;
        var normal = 20;
        var interval = setInterval(function () {
            // var a = time >= 1500 ? a0:-a0;            
            var v = time >= 1500 ? a0 * (3000-time) : a0*1500 + -a0 * (1500-time);//旋转角度
            // clock = v >= 1500 ? clock : clock+60;
            sector.translate(600,600);
            sector.rotate(Math.PI/180 * v);
            sector.translate(-600,-600);
            sector.clearRect(0,0,1200,1200);
            paintName(data);
            time -= normal;

            if(time == 0){
                window.clearInterval(interval);
            }
        },clock)
    }
</script>
</html>
```

![](/images/blog/canvas-lun-pan/01.png)
