---
title: "页面点击任意标签获取标签名"
description: "以上是为了兼容"
date: 2019-03-18
collection: javascript
tags: []
readingTime: 1
wordage: 7
originalUrl: "https://www.jianshu.com/p/b167c598dfe2"
---
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<p id="demo">单击按钮来显示该元素的标记名称</p>
<button>点我</button>
<script>
  document.onclick=function(event){
  let ev=event || window.event;
  let selected=ev.target || ev.srcElement;
  console.log(selected.tagName)
}
</script>

</body>
</html>
```

以上是为了兼容
