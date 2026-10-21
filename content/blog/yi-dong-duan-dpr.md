---
title: "移动端dpr"
description: "例子： 在javascript中，可以通过window.devicePixelRatio获取到当前设备的dpr。在css中，可以通过-webkit-device-pixel-..."
date: 2019-04-24
collection: css-mobile
tags: ["移动端"]
readingTime: 1
wordage: 203
originalUrl: "https://www.jianshu.com/p/6ec80b9ab50c"
---
例子：

```
@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
    .border-1px{
        &::after{
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
}
```

在javascript中，可以通过window.devicePixelRatio获取到当前设备的dpr。  
在css中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

网页一般dpr为1  
Iphone5-6的dpr为2  
特殊点da大的dpr为3

\-webkit-min-device-pixel-ratio为1.0  
所有非Retina的Mac  
所有非Retina的iOS设备  
Acer Iconia A500  
Samsung Galaxy Tab 10.1  
Samsung Galaxy S

\-webkit-min-device-pixel-ratio为1.3  
Google Nexus 7

\-webkit-min-device-pixel-ratio为1.5  
Google Nexus S  
Samsung Galaxy S II  
HTC Desire  
HTC Desire HD  
HTC Incredible S  
HTC Velocity  
HTC Sensation

\-webkit-min-device-pixel-ratio为2.0  
iPhone 4  
iPhone 4S  
iPhone 5  
iPad (3rd generation)  
iPad 4  
所有Retina displays 的MAC  
Google Galaxy Nexus  
Google Nexus 4  
Google Nexus 10  
Samsung Galaxy S III  
Samsung Galaxy Note II  
Sony Xperia S  
HTC One X
