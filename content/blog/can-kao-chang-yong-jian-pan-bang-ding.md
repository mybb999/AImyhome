---
title: "参考常用键盘绑定"
description: "//绑定回车键盘"
date: 2019-04-24
collection: javascript
tags: []
readingTime: 1
wordage: 6
originalUrl: "https://www.jianshu.com/p/f263a25bc91f"
---
//绑定回车键盘

```
  $(".search_help").keydown(function(event){
      // event.preventDefault();
      var keycode=event.which||event.keyCode;      
      if(keycode==13||keycode==108)
          $(".submit_help").click();      
  });
```
