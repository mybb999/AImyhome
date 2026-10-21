---
title: "window.devicePixelRatio"
description: "devicePixelRatio属性该 Window 属性 devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率。此值也可以解释..."
date: 2019-04-24
collection: css-mobile
tags: []
readingTime: 1
wordage: 296
originalUrl: "https://www.jianshu.com/p/baa47f5329aa"
---
```
value = window.devicePixelRatio;
```

devicePixelRatio属性  
该 Window 属性 devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率。此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小的比值。简单地说，这告诉浏览器应该使用多少个屏幕的实际像素来绘制单个 CSS 像素。

这在处理标准显示与 HiDPI 或 Retina 显示之间的差异时很有用，它使用更多屏幕像素绘制相同对象，从而产生更清晰的图像。

当此值发生变化时（例如，如果用户将 window 拖到具有不同像素密度的显示器上），则无法通知该值。由于没有可用于检测像素密度变化的回调或事件，因此唯一的方法是定期检查其 devicePixelRatio 值是否已更改。不要经常这样做，否则会影响性能。  
PS:说白了，获得设备物理像素与CSS像素比例

像移动端适配，可以在媒体查询设置
