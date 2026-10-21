---
title: "websocket+心跳包"
description: "详情参考websocket+心跳包：https://www.cnblogs.com/1wen/p/5808276.html 上面一段是菜鸟代码，但是要清楚websocket是..."
date: 2019-02-28
collection: browser-network
tags: ["WebSocket"]
readingTime: 1
wordage: 143
originalUrl: "https://www.jianshu.com/p/3afb24c3b431"
---
详情参考websocket+心跳包：[https://www.cnblogs.com/1wen/p/5808276.html](https://www.cnblogs.com/1wen/p/5808276.html)

```
<!DOCTYPE HTML>
<html>
   <head>
   <meta charset="utf-8">
   <title>菜鸟教程(runoob.com)</title>
    
      <script type="text/javascript">
         function WebSocketTest()
         {
            if ("WebSocket" in window)
            {
               alert("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
               var ws = new WebSocket("ws://localhost:9998/echo");
                
               ws.onopen = function()
               {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }
      </script>
        
   </head>
   <body>
   
      <div id="sse">
         <a href="javascript:WebSocketTest()">运行 WebSocket</a>
      </div>
      
   </body>
</html>
```

上面一段是菜鸟代码，但是要清楚websocket是前后端交互的长连接，前后端也都可能因为一些情况导致连接失效并且相互之间没有反馈提醒。因此为了保证连接的可持续性和稳定性，websocket心跳重连就应运而生。

以下是我自己项目的代码，不要在意内容，在意形式就好，里面掺杂着心跳包插件。

```
var ws;
  var wsUrl="ws://"+window.location.host+"/mss/h5WebSocket";
  var lockReconnect = false;//避免重复连接的开关
  var tempTrainAlarm={};
  function  createWebSocket(url)
  {
    try{
      ws=new WebSocket(url);
      initEventHandle();
    }
    catch(e){
      reconnect(url);
    }
  };
  function initEventHandle()
  {
    ws.onclose=function(){
      reconnect(wsUrl);
    };
    ws.onerror=function(){
      reconnect(wsUrl);
    };
    ws.open=function(){
      heartCheck.reset();
    }
    ws.onmessage=function(message){
      if(message.data!=="HeartBeat")
      {        
        var outerData=JSON.parse(message.data);
        if(outerData.websocketType=="logout")//实际这一步不太需要，如果报文发不过来这一条也能保证执行而已，下面已经有了
        { 
         window.location.href="/mss/h5/login.html";
        }
        var dataStr=outerData.msg.toString();//这一步是从message里的data的msg转成字符串
        var data=JSON.parse(dataStr);//将字符串转换成对象        
        if(outerData.websocketType=="tab")
        {
          tabSession[0] = data;
          // tab_interval_off = true;
        }
        else if(outerData.websocketType=="mqFtp")
        {
          mqFtpSession[0] = data;
        }
        else if(outerData.websocketType=="alarmList")
        {
          alarmListSession.push(data);
        }
        else if(outerData.websocketType=="logout")
        {          
          window.location.href="/mss/h5/login.html";
        }
        else if(outerData.websocketType=="SwitchValueList")
        {
            SwitchValueListSession.push(data); 
        }
        else if(outerData.websocketType=="VobcTrainOnLine")
        {
              VobcTrainOnLineSession[0] = data;
          // vobc_interval_off = true;
        }
        else if(outerData.websocketType=="WEBSOCKET_AXLE_SECTION_RESET_TYPE")
        {
          axleSession.push(data); 
        }
        else if(outerData.websocketType=="WEBSOCKET_LTE_ALARM_TYPE")
        {
          lteSession.push(data);
        }
        else if(outerData.websocketType=="WEBSOCKET_LTE_ALARM_TAB_TYPE")
        {
          lteTabSession[0] = data;
        }
        else console.log("多了一种websocketType");
      }
      heartCheck.reset();
    }
  };
  function reconnect(url)
  {
    if(lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      createWebSocket(url);
      lockReconnect = false;
    }, 2000);
  }

  var heartCheck = {
    timeout: 60000,//60s
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
  　　　　 this.start();
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){
                ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    },
  };
  createWebSocket(wsUrl);
```
